import { S } from './ui';
import '../../../../src/App.css';
import { makeStyles } from '@material-ui/core/styles';
import { AiOutlineClose } from 'react-icons/ai';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

const useStyles = makeStyles({
  close: {
    color: '#FADA5E',
    position: 'absolute',
    right: '5px',
    cursor: 'pointer',
    top: '5px',
  },
});

export default function RefModalFollow({
  id,
  location,
  modalVisibleId,
  setModalVisibleId,
  idea,
  isFollow,
  memberId,
}) {
  const classes = useStyles();
  const navigate = useNavigate();

  const [stateFollow, setStateFollow] = useState(false);

  const onClickFollow = () => {
    //setStatestateFollow(!stateFollow);
    if (!sessionStorage.getItem('nickname')) {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/sociallogin');
    } else {
      // follow 정보 보내고
      axios
        .post(`/BE/follow/${memberId}`)
        .then((res) => {
          console.log(res);
          if (res.status === 201) {
            // 팔로잉 시작
            setStateFollow(true);
          } else if (res.status === 200) {
            // 언팔로잉 시작
            setStateFollow(false);
          }
          // follow 정보 받아옴
          axios
            .get(`/BE/follow/${memberId}`)
            .then((res) => {
              setFollower(res.data.data.follower);
              setFollowing(res.data.data.following);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
          if (err.response.data.detail === '자신을 팔로우할 수 없습니다') {
            setIsItMe(true);
            alert('자신은 팔로우할 수 없습니다.');
            console.log('자신의 프로필 모달창은 띄우지 않습니다');
            setModalVisibleId('');
          }
        });
    }
  };

  const [following, setFollowing] = useState(0);
  const [follower, setFollower] = useState(0);
  const [isItMe, setIsItMe] = useState(false);

  useEffect(() => {
    console.log('팔로잉/팔로우 확인');
    axios
      .get(`/BE/follow/${memberId}`)
      .then((res) => {
        console.log(res);
        setFollower(res.data.data.follower);
        setFollowing(res.data.data.following);
      })
      .catch((err) => {
        console.log(err);
      });

    setStateFollow(isFollow);
  }, [isFollow, memberId, modalVisibleId]);

  return (
    <S.SmallModalWrapper
      className={
        modalVisibleId === id && isItMe === false ? 'd_block' : 'd_none'
      }
      location={location}
    >
      <AiOutlineClose
        onClick={() => {
          setModalVisibleId('');
        }}
        className={classes.close}
      >
        닫기
      </AiOutlineClose>

      <S.ModalProfile>
        <S.ModalProfilePhoto src={idea.postMember.profileImage} />
        <S.ModalProfileName style={{ fontSize: '70%' }}>
          {idea.postMember.nickname}
        </S.ModalProfileName>
      </S.ModalProfile>

      <S.FollowingFollower>
        <S.ModalFollowing style={{ fontSize: '70%' }}>
          Following
          <span style={{ color: 'black' }}>&nbsp;&nbsp;{following}</span>
        </S.ModalFollowing>
      </S.FollowingFollower>

      <S.FollowingFollower>
        <S.ModalFollower style={{ fontSize: '70%' }}>
          Follower<span style={{ color: 'black' }}>&nbsp;&nbsp;{follower}</span>
        </S.ModalFollower>
      </S.FollowingFollower>

      <S.SmallModalButtonWrapper>
        <S.SmallModalButton onClick={onClickFollow}>
          {stateFollow ? '언팔로잉하기' : '팔로잉하기'}
        </S.SmallModalButton>
        <S.SmallModalButton
          style={{ marginLeft: '7px', cursor: 'pointer' }}
          onClick={() => {
            navigate(`/user/list/${memberId}`);
          }}
        >
          더 많은 작품 보기
        </S.SmallModalButton>
      </S.SmallModalButtonWrapper>
    </S.SmallModalWrapper>
  );
}
