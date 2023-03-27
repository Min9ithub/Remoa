import { MS } from "../../../layout/ModalStyle";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RMCommentWrite(props) {
  const navigate = useNavigate();
  const [contents, setContents] = useState("");

  const onChangeContents = (event) => {
    setContents(event.target.value);
  };

  const onSumbitHandler = () => {
    //e.preventDefault();
    const UploadComment = {
      comment: contents,
    };
    //const data = axios
    axios
      .post(`/BE/reference/${props.postId}/comment`, UploadComment)
      .then((response) => {
        console.log(response);
        //if (response.status === 200) alert(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    //navigate("/");

    //return data;
  };

  return (
    <MS.CommentWriteWrapper>
      <p style={{ float: "left", fontSize: "20px" }}>Comment</p>
      <MS.CommentButton onClick={onSumbitHandler}>댓글 등록</MS.CommentButton>
      <MS.WriteInput
        required
        placeholder="해당 작업물에 대한 의견을 자유롭게 남겨주세요!
        욕설이나 비방 등 이용약관에 위배되는 코멘트는 서비스 이용 정지 사유가 될 수 있습니다."
        onChange={onChangeContents}
        value={contents}
      />
    </MS.CommentWriteWrapper>
  );
}
