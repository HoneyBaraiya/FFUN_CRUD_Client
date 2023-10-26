import React, { useEffect, useState } from 'react';
import {
    Button,
    Cascader,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Switch,
    TreeSelect,
    Modal,
    message
} from 'antd';
import callApi from '../services/callAPI';
import endPoints from '../services/endPoint';

const InventoryModal = ({
    modalType,
    modalContent,
    isOpen,
    setIsOpen,
}) => {
    const [form] = Form.useForm();
    const { inventory: inventoryConfig } = endPoints
    const [initialFormValues, setInitialFormValues] = useState({
        make: "",
        year: new Date().getFullYear(),
        model: "",
        price: 0,
        status: "Live",
    });



    const showModal = () => {
        setIsOpen(true);
    };


    const handleOk = () => {
        form.submit()

    };
    const handleCancel = () => {
        setIsOpen(false);
        form.resetFields()

    };

    const onFinish = async (values) => {
        if (modalType == 'ADD') {
            const { data, message: info } = await callApi(
                {
                    uriEndPoint: inventoryConfig.add,
                    body: values
                })
            message.success(info)

        }
        if (modalType == "EDIT") {
            const { data, message: info } = await callApi(
                {
                    uriEndPoint: inventoryConfig.update,
                    suffix: `${modalContent._id}`,
                    body: values
                })
            message.success(info)
        }
        form.resetFields()
        setIsOpen(false);
    }
    useEffect(() => {
        if (modalType == "EDIT") {
            form.setFieldsValue({ ...modalContent })
        }
        return () => {
            form.resetFields()
        }
    }, [modalType, modalContent])


    return (
        <>
            <Modal title={modalType} open={isOpen} okText={"Submit"} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    onFinish={onFinish}
                    form={form}
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 14,
                    }}
                    layout="horizontal"
                    style={{
                        maxWidth: 600,
                    }}

                >
                    <Form.Item label="Make" name='make' rules={[
                        { required: true }
                    ]}>
                        <Input placeholder='Company Name' />
                    </Form.Item>
                    <Form.Item label="Model" name='model' rules={[
                        { required: true }
                    ]}>
                        <Input placeholder='Model Number' />
                    </Form.Item>
                    <Form.Item label="Year" name='year' rules={[
                        { required: true }
                    ]} >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item label="Price" name='price' rules={[
                        { required: true }
                    ]}>
                        <InputNumber />
                    </Form.Item>
                    <Form.Item label="Status" name='status' rules={[
                        { required: true }
                    ]}>
                        <Select>
                            <Select.Option value="Live">Live</Select.Option>
                            <Select.Option value="Sold">Sold</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal >
        </>
    );
};

export default InventoryModal;
