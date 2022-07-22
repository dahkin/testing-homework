import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import './CardItem.css';
import { Statistic, Button, Typography, Menu, Dropdown, Modal } from 'antd';
import EllipsisOutlined from '@ant-design/icons/EllipsisOutlined';
import ExclamationCircleOutlined from '@ant-design/icons/ExclamationCircleOutlined';
import classnames from 'classnames';
import { CardModal } from '@features/cards/components/CardModal/CardModal';
import { CardColor } from '@features/cards/types';
import { deleteCard } from '@features/cards/actions';
import { Dispatch } from '@app/store';

interface Props {
  balance: number;
  cardNumber: string;
  id: string;
  color?: CardColor;
}

export const CardItem: FC<Props> = ({ id, balance, cardNumber, color }) => {
  const dispatch = useDispatch<Dispatch>();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const showEditModal = () => {
    setIsEditModalVisible(true);
  };

  const closeEditModal = () => {
    setIsEditModalVisible(false);
  };

  const showDeleteConfirm = () => {
    Modal.confirm({
      title: 'Удалить карту?',
      icon: <ExclamationCircleOutlined />,
      content: 'Отменить удаление будет невозможно',
      cancelText: 'Отменить',
      okText: 'Удалить',
      onOk() {
        return dispatch(deleteCard(id));
      },
      onCancel() {
        //
      },
    });
  };

  return (
    <>
      <section
        className={classnames('CardItem', {
          [`CardItem--${color}`]: color !== undefined,
        })}
        data-testid="card-item"
      >
        <header className="CardItem__header">
          <Statistic value={balance} groupSeparator=" " suffix="₽" valueStyle={{ color: 'white' }} />
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item data-testid="update-card-btn" key="1" onClick={showEditModal}>
                  Изменить
                </Menu.Item>
                <Menu.Item data-testid="delete-card-btn" key="2" danger onClick={showDeleteConfirm}>
                  Удалить
                </Menu.Item>
              </Menu>
            }
          >
            <Button data-testid="card-dropdown-btn" shape="circle" size="small" icon={<EllipsisOutlined />} />
          </Dropdown>
        </header>

        <Typography.Text style={{ color: 'white' }}>{cardNumber}</Typography.Text>
      </section>

      <CardModal
        id={id}
        cardNumber={cardNumber}
        balance={balance.toString()}
        color={color}
        closeModal={closeEditModal}
        isOpenModal={isEditModalVisible}
      />
    </>
  );
};
