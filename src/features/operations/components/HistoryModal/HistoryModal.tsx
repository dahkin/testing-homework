import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Input, InputNumber, message, Radio, Select } from 'antd';
import { OperationType } from '@features/operations/types';
import { updateOperation, addOperation } from '@features/operations/actions';
import { Dispatch } from '@app/store';
import { getCards } from '@features/cards/selectors';
import { maskNumber } from '@app/utils';

interface Props {
  isOpenModal: boolean;
  closeModal: () => any;
  id?: string;
  title?: string;
  text?: string;
  value?: number;
  isIncome?: boolean;
}

interface OperationFormData {
  name: string;
  value: number;
  type: OperationType;
  cardNumber: string;
}

export const HistoryModal: FC<Props> = ({
  isOpenModal,
  closeModal,
  id,
  title = '',
  text = '',
  value = null,
  isIncome = false,
}) => {
  const dispatch = useDispatch<Dispatch>();
  const cards = useSelector(getCards);
  const [form] = Form.useForm();

  const onCancel = () => {
    form.resetFields();
    closeModal();
  };

  const onValid = () => {
    const formData = form.getFieldsValue() as OperationFormData;
    const data = {
      name: formData.name,
      value: formData.value,
      type: formData.type,
      cardNumber: formData.cardNumber,
    };

    if (id) {
      dispatch(updateOperation({ id: id, data: data })).then(() => {
        message.success('Операция обновлена!');
        onCancel();
      });
    } else {
      dispatch(addOperation(data)).then(() => {
        message.success('Операция сохранена!');
        onCancel();
      });
    }
  };

  const onSubmit = () => {
    form.submit();
  };

  return (
    <Modal
      title={id ? `Редактирование операции` : `Новая операция`}
      visible={isOpenModal}
      onOk={onSubmit}
      onCancel={onCancel}
      okText="Сохранить"
      cancelText="Отменить"
      closable
      data-testid="operation-modal"
    >
      <Form form={form} layout="vertical" onFinish={onValid} autoComplete="off">
        <Form.Item
          label="Тип"
          name="type"
          initialValue={isIncome ? 'income' : 'expense'}
          rules={[{ required: true, message: 'Обязательное поле' }]}
        >
          <Radio.Group>
            <Radio.Button data-testid="type" value="income">
              Доход
            </Radio.Button>
            <Radio.Button data-testid="type" value="expense">
              Расход
            </Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="name"
          label="Название платежа"
          initialValue={title}
          rules={[{ required: true, message: 'Обязательное поле' }]}
        >
          <Input data-testid="name" placeholder="Продукты" />
        </Form.Item>
        <Form.Item
          name="cardNumber"
          label="Карта"
          initialValue={text}
          rules={[{ required: true, message: 'Обязательное поле' }]}
        >
          <Select data-testid="cardNumber" placeholder="Выберите карту" getPopupContainer={(node) => node.parentNode}>
            {cards.map((item) => (
              <Select.Option data-testid="cardNumber-value" key={item.id} value={item.number}>
                {maskNumber(item.number)}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="value"
          label="Сумма ₽"
          initialValue={value}
          rules={[{ required: true, message: 'Обязательное поле' }]}
        >
          <InputNumber data-testid="value" placeholder="Сумма в рублях" style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
