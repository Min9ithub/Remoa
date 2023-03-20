import { React, useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import ManageList from "./ManageList";
import "./ManageListContainer.scss";
import { useNavigate } from "react-router";

function ManageListContainer() {
  const [mywork, setMywork] = useState([]);
  const [totalOfAllReferences, setTotalOfAllReferences] = useState(0);
  const [totalOfPageElements, setTotalOfPageElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [pageNumber, setPageNumber] = useState(1);
  const [sortOption, setSortOption] = useState("newest");
  const [categoryName, setCategoryName] = useState("all");

  const navigate = useNavigate();

  useEffect(() => {
    // 화면이 처음 뜰 때 렌더링
    console.log("화면 첫 렌더링");
    const endpoint = `/BE/user/reference?page=${pageNumber}&sort=${sortOption}&category=${categoryName}`;

    getWork(endpoint);
  }, []);

  useEffect(() => {
    // 카테고리를 바꿀 떄마다 렌더링
    console.log("카테고리를 바꿀 때마다 렌더링");
    setCategoryName((categoryName) => categoryName);
    const endpoint = `/BE/user/reference?page=${pageNumber}&sort=${sortOption}&category=${categoryName}`;
    getWork(endpoint);
  }, [categoryName]);

  const onChangeCategory = (e) => {
    setCategoryName(e.target.value);
    setPageNumber(1); // 카테고리 바꾸면 페이지 1로 자동 렌더링
  };

  const getWork = (endpoint) => {
    console.log("========");
    console.log(endpoint);
    axios
      .get(endpoint)
      .then((res) => {
        console.log(res);
        setMywork([...res.data.data.references]);
        setTotalOfAllReferences(res.data.data.totalOfAllReferences);
        setTotalOfPageElements(res.data.data.totalOfPageElements);
        setTotalPages(res.data.data.totalPages);
        setPageNumber(res.data.data.totalOfPageElements);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadMoreItems = () => {
    const endpoint = `/BE/user/reference?page=${
      pageNumber + 1
    }&sort=${sortOption}&category=${categoryName}`;
    getWork(endpoint);
  };

  return (
    <div className="ManageListContainer">
      <div align="left" style={{ margin: "30px auto" }}>
        내 작업물 목록
      </div>
      <div align="center" style={{ paddingBottom: "30px" }}>
        <div className="form_radio_btn" style={{ float: "left" }}>
          <input
            id="radio-1"
            type="radio"
            name="category"
            value="all"
            onChange={onChangeCategory}
          />
          <label htmlFor="radio-1">전체</label>
        </div>
        <div className="form_radio_btn" style={{ float: "left" }}>
          <input
            id="radio-2"
            type="radio"
            name="category"
            value="idea"
            onChange={onChangeCategory}
          />
          <label htmlFor="radio-2">기획/아이디어</label>
        </div>
        <div className="form_radio_btn" style={{ float: "left" }}>
          <input
            id="radio-3"
            type="radio"
            name="category"
            value="marketing"
            onChange={onChangeCategory}
          />
          <label htmlFor="radio-3">광고/마케팅</label>
        </div>
        <div className="form_radio_btn" style={{ float: "left" }}>
          <input
            id="radio-4"
            type="radio"
            name="category"
            value="video"
            onChange={onChangeCategory}
          />
          <label htmlFor="radio-4">영상</label>
        </div>
        <div className="form_radio_btn" style={{ float: "left" }}>
          <input
            id="radio-5"
            type="radio"
            name="category"
            value="design"
            onChange={onChangeCategory}
          />
          <label htmlFor="radio-5">디자인/사진</label>
        </div>
        <div className="form_radio_btn" style={{ float: "left" }}>
          <input
            id="radio-6"
            type="radio"
            name="category"
            value="etc"
            onChange={onChangeCategory}
          />
          <label htmlFor="radio-6">기타 아이디어</label>
        </div>
      </div>
      <div>
        {!totalOfAllReferences ? (
          <div style={{ marginTop: "50px" }}>
            <span
              style={{
                fontSize: "1.75vw",
                color: "#464646",
              }}
            >
              지금 바로 작업물을 올려보세요!
            </span>
          </div>
        ) : (
          <>
            <ManageList
              data={mywork}
              TAR={totalOfAllReferences}
              TPE={totalOfPageElements}
              TP={totalPages}
            />
            <button onClick={loadMoreItems}>더 보기</button>
          </>
        )}
      </div>
    </div>
  );
}

export default ManageListContainer;
