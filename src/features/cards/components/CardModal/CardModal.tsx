import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Form, Input, message, Radio } from 'antd';
import { CardColor } from '@features/cards/types';
import { updateCard, addCard } from '@features/cards/actions';
import { Dispatch } from '@app/store';
import { maskNumber } from '@app/utils';

interface Props {
  isOpenModal: boolean;
  closeModal: () => any;
  id?: string;
  cardNumber?: string;
  balance?: string;
  color?: CardColor;
}

interface CardFormData {
  number: string;
  balance: string;
  color: CardColor;
}

export const CardModal: FC<Props> = ({ isOpenModal, closeModal, id, cardNumber = '', balance = '', color = '' }) => {
  const dispatch = useDispatch<Dispatch>();
  const [form] = Form.useForm();

  const onCancel = () => {
    form.resetFields();
    closeModal();
  };

  const onValid = () => {
    const formData = form.getFieldsValue() as CardFormData;
    const data = {
      color: formData.color,
      balance: parseFloat(formData.balance),
      number: maskNumber(formData.number),
    };

    if (id) {
      dispatch(updateCard({ id: id, data: data })).then(() => {
        message.success('Карта обновлена!');
        onCancel();
      });
    } else {
      dispatch(addCard(data)).then(() => {
        message.success('Карта сохранена!');
        onCancel();
      });
    }
  };

  const onSubmit = () => {
    form.submit();
  };

  return (
    <Modal
      title={id ? `Редактирование карты` : `Новая карта`}
      visible={isOpenModal}
      onOk={onSubmit}
      onCancel={onCancel}
      okText="Сохранить"
      cancelText="Отменить"
      closable
      data-testid="card-modal"
    >
      <Form form={form} layout="vertical" onFinish={onValid} autoComplete="off">
        <Form.Item
          label="Цвет"
          name="color"
          initialValue={color}
          rules={[{ required: true, message: 'Обязательное поле' }]}
        >
          <Radio.Group>
            <Radio.Button data-testid="color" value="blue">
              Синий
            </Radio.Button>
            <Radio.Button data-testid="color" value="cyan">
              Бирюзовый
            </Radio.Button>
            <Radio.Button data-testid="color" value="pink">
              Розовый
            </Radio.Button>
            <Radio.Button data-testid="color" value="dark-blue">
              Темно-синий
            </Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="number"
          label="Номер карты"
          initialValue={cardNumber}
          rules={[
            { required: true, message: 'Обязательное поле' },
            {
              type: 'string',
              pattern: new RegExp(/^\d+$/),
              min: 16,
              max: 19,
              message: 'Номер может содержать только цифры (от 16-ти до 19-ти)',
            },
          ]}
        >
          <Input data-testid="number" placeholder="1111 1111 1111 1111" />
        </Form.Item>
        <Form.Item
          name="balance"
          label="Текущий баланс ₽"
          initialValue={balance}
          rules={[
            { required: true, message: 'Обязательное поле' },
            { type: 'string', pattern: new RegExp(/^\d+$/), message: 'Баланс может содержать только цифры' },
          ]}
        >
          <Input data-testid="balance" placeholder="Сумма в рублях" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
