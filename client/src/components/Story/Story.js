import React,{useState} from 'react';
import styles from './styles';
import { Card, Tooltip,Typography,Image} from 'antd';
import {EditOutlined,DeleteTwoTone,HeartTwoTone} from "@ant-design/icons";
import moment from "moment";
import { useDispatch } from 'react-redux';
import { deleteStory,likeStory } from '../../actions/stories';


const {Meta}= Card;
const {Link, Paragraph, Text}=Typography


function Story({story,setSelectedId}) {

  const dispatch = useDispatch();

  const [expand,setExpand] = useState(true);
  console.log(story);

  const user = JSON.parse(localStorage.getItem("profile"));

  const cardActions=[
    <div>
      <Tooltip
      placement="top"
      title="Like"
      color="magenta"
      onClick={()=>{
        dispatch(likeStory(story._id))
        console.log("Like button clicked")
      
      }}
      >
      <HeartTwoTone twoToneColor="magenta"/>
      &nbsp; {story.likes.length} &nbsp;
      </Tooltip>
    </div>,
    
    <Tooltip
      placement="top"
      title="Edit"
    >
      <EditOutlined onClick={()=>{
        setSelectedId(story._id);
      }} />
    </Tooltip>,
    <Tooltip
      placement="top"
      title="Delete"
      color="red"
    >
      <DeleteTwoTone twoToneColor="red" onClick={()=> dispatch(deleteStory(story._id))} />
    </Tooltip>       
  ]

  return (
    <Card
      style={styles.card}
      cover={<Image src={story.image} />}
      actions={
        user?.result?._id === story?.userId ?
        cardActions : 
        user?.result?
          cardActions.slice(0,1)
          : null
      }
    >
      <Meta title={story.username} />
      <Paragraph
        style={{margin:0}}
        ellipsis={{
          rows:2,
          expandable:true,
          symbol:"more",
          onExpand:()=>{
            setExpand(true);
          },
          onEllipses:()=>{
            setExpand(false);
          }
        }}
      >
        {story.caption}
      </Paragraph>
      <br />
      <Text type="secondary">{moment(story.postDate).fromNow()}</Text>
    </Card>
  )
};

export default Story;