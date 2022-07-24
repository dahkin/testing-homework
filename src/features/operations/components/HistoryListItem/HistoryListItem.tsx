import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import './HistoryListItem.css';
import { Typography, List, Avatar, Dropdown, Menu, Button, Modal } from 'antd';
import EllipsisOutlined from '@ant-design/icons/EllipsisOutlined';
import ExclamationCircleOutlined from '@ant-design/icons/ExclamationCircleOutlined';
import { HistoryModal } from '@features/operations/components/HistoryModal/HistoryModal';
import { deleteOperation } from '@features/operations/actions';
import { Dispatch } from '@app/store';

interface Props {
  id: string;
  title: string;
  text: string;
  value: number;
  isIncome: boolean;
}

export const HistoryListItem: FC<Props> = ({ id, title, text, value, isIncome = false }) => {
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
      title: 'Удалить операцию?',
      icon: <ExclamationCircleOutlined />,
      content: 'Отменить удаление будет невозможно',
      cancelText: 'Отменить',
      okText: 'Удалить',
      onOk() {
        return dispatch(deleteOperation(id));
      },
      onCancel() {
        //
      },
    });
  };

  return (
    <>
      <List.Item data-testid="history-item">
        <List.Item.Meta
          avatar={<Avatar src={`https://joeschmoe.io/api/v1/random/?${Math.random()}`} />}
          title={title}
          description={text}
        />
        <div className="HistoryListItem__extra">
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item data-testid="update-operation-btn" key="1" onClick={showEditModal}>
                  Изменить
                </Menu.Item>
                <Menu.Item data-testid="delete-operation-btn" key="2" danger onClick={showDeleteConfirm}>
                  Удалить
                </Menu.Item>
              </Menu>
            }
          >
            <Button data-testid="operation-dropdown-btn" size="small" shape="circle" icon={<EllipsisOutlined />} />
          </Dropdown>
          <Typography.Text type={isIncome ? 'success' : 'secondary'}>
            {isIncome ? '+' : ''}
            {value.toLocaleString('ru-RU', {
              style: 'currency',
              currency: 'RUB',
              maximumFractionDigits: 0,
            })}
          </Typography.Text>
        </div>
      </List.Item>

      <HistoryModal
        id={id}
        value={value}
        title={title}
        text={text}
        isIncome={isIncome}
        closeModal={closeEditModal}
        isOpenModal={isEditModalVisible}
      />
    </>
  );
};
