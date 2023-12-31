import React, { useEffect, useState } from 'react';
import {
    Form,
    Input,
    InputNumber,
    Select,
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
        if (modalType === 'ADD') {
            const { data, message: info } = await callApi(
                {
                    uriEndPoint: inventoryConfig.add,
                    body: values
                })
            message.success(info)

        }
        if (modalType === "EDIT") {
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
        if (modalType === "EDIT") {
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
                        <Input placeholder='Company Name' maxLength={15} />
                    </Form.Item>
                    <Form.Item label="Model" name='model' rules={[
                        { required: true }
                    ]}>
                        <Input placeholder='Model Number' maxLength={15}  />
                    </Form.Item>
                    <Form.Item label="Year" name='year' rules={[
                        { required: true },
                        {
                            
                            validator(rule,value){
                                return new Promise((resolve,reject)=>{
                                    if(value<2000 || value>2023)
                                        reject("The Year should be between 2000 and 2023");
                                    else
                                        resolve();
                                })
                               
                            },
                        
                        },
                        
                    ]} >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item label="Price" name='price' rules={[
                        { required: true },
                        {
                            
                            validator(rule,value){
                                return new Promise((resolve,reject)=>{
                                    if(value>500000)
                                        reject("The price should be within 500000");
                                    else
                                        resolve();
                                })
                               
                            },
                        
                        },
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
    )
}

export default InventoryModal;
