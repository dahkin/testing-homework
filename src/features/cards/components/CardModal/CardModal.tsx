import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Form, Input, message, Radio } from 'antd';
import { CardColor } from '@features/cards/types';
import { updateCard } from '@features/cards/actions';
import { addCardApi } from '@features/cards/slice';
import { Dispatch } from '@app/store';

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
      number: `${formData.number.slice(0, 4)} **** **** ${formData.number.slice(-4)}`,
    };

    if (id) {
      dispatch(updateCard(id, data)).then(() => {
        message.success('Карта обновлена!');
        onCancel();
      });
    } else {
      dispatch(addCardApi(data)).then(() => {
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
    >
      <Form form={form} layout="vertical" onFinish={onValid} autoComplete="off">
        <Form.Item label="Цвет" name="color" initialValue={color} rules={[{ required: true }]}>
          <Radio.Group>
            <Radio.Button value="blue">Синий</Radio.Button>
            <Radio.Button value="cyan">Бирюзовый</Radio.Button>
            <Radio.Button value="pink">Розовый</Radio.Button>
            <Radio.Button value="dark-blue">Темно-синий</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="number"
          label="Номер карты"
          initialValue={cardNumber}
          rules={[{ required: true }, { type: 'string', min: 16, max: 19 }]}
        >
          <Input placeholder="1111 1111 1111 1111" />
        </Form.Item>
        <Form.Item name="balance" label="Текущий баланс ₽" initialValue={balance} rules={[{ required: true }]}>
          <Input placeholder="Сумма в рублях" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
