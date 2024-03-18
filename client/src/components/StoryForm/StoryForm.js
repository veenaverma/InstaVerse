import React, {useEffect} from 'react';
import styles from './styles';
import { Link } from 'react-router-dom';
import FileBase64 from "react-file-base64";

import { Card, Form,Input,Typography,Button } from 'antd';
import FormItem from 'antd/es/form/FormItem';

import { useDispatch } from 'react-redux';
import { createStory,updateStory } from '../../actions/stories';

import { useSelector } from 'react-redux';

const {Title} = Typography;

function StoryForm({selectedId,setSelectedId}) {
  const [form] = Form.useForm();
  const dispatch=useDispatch();

  
  const story = useSelector((state) => 
  {
    // console.log(state.stories);
    
    return selectedId?state.stories.find(story=>story._id === selectedId):null
  }

  );

  useEffect(()=>{
    if(story && story._id){
      form.setFieldsValue(story);
    }
  },[story,form]);

  const reset=()=>{
    form.resetFields();
    setSelectedId(null);
  }

  const user=JSON.parse(localStorage.getItem("profile"));
  const username=user?.result?.username;

  const onSubmit = (formValues) =>{
    console.log(selectedId);
    if(selectedId)
    {
      dispatch(updateStory(selectedId,{...formValues,username}));
    }
    else 
    {
      dispatch(createStory({...formValues,username}));
    }

    reset();
  };
 
  console.log("User = ",user);
  if(!user){
    return(
      <Card style={styles.formCard}>
      <Title level={4}>
        <span style={styles.formTitle}>
          Welcome to Instaverse
        </span><br />
        Please <Link to="/authform" >login</Link> or{" "}
        <Link to="/authform">register</Link> for sharing instant moments or ideas.
      </Title>
    </Card>
    )
  };

  return (
    <Card
      style={styles.formCard}
      title={
        <Title level={4} style={styles.formTitle}>
          {selectedId? "Editing":"Share"} a story
        </Title>
      }
    >
      <Form
        form={form}
        labelCol={{span:6}}
        wrapperCol={{span:16}}
        layout='horizontal'
        size='middle'
        onFinish={onSubmit}
      >
        
        <Form.Item name="caption" label='Caption' rules={[{required:true}]}>
          <Input.TextArea allowClear autoSize={{minRows:2,maxRows:6}}/>
        </Form.Item>
        <Form.Item name="image" label='Image'>
          <FileBase64
            type="file"
            multiple={false}
            onDone={(e)=>{
              form.setFieldsValue({
                image:e.base64
              })
            }}
          />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            span: 16,
            offset: 6
          }}
        >
         <Button
          type="primary"
          block
          htmlType='submit'
         >
           Share
         </Button>
        </Form.Item>

        {!selectedId?null:
          <FormItem
          wrapperCol={{
            span:16,
            offset:6
          }}>
            <Button
            type='primary'
            block
            htmlType='button'
            danger
            onClick={reset}
            >
              Discard
            </Button>
          </FormItem>
        }
      </Form>
    </Card>
  )
};

export default StoryForm;