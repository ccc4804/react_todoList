import React from "react";
import styled from "styled-components";
import { useTodoState, useTodoDispatch } from "../context/TodoContext";
import { MdCached } from "react-icons/md"; //위에서 아래로 드래그 했을 때 새로고침 되게

const TodoHeadBlock = styled.div`
  padding-top: 48px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e9ecef;
`;

const NowDate = styled.h1`
  margin: 0;
  font-size: 36px;
  color: #343a40;
`;

const NowDay = styled.div`
  margin-top: 4px;
  font-size: 21px;
  color: #868e96;
`;

const TaskLeft = styled.div`
  display: flex;
  align-items: center;
  color: #20c997;
  font-size: 21px;
  margin-top: 40px;
  font-weight: bold;
`;

const Refresh = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 30px;
  cursor: pointer;
  padding-left: 30px;
  &:hover {
    color: #ff6b6b;
  }
`;

function TodoHead() {
  const todos = useTodoState();
  const undoneTasks = todos.filter((todo) => !todo.done);

  const today = new Date();
  const dateString = today.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const dayName = today.toLocaleDateString("ko-KR", {
    weekday: "long",
  });

  const dispatch = useTodoDispatch();
  const onRefresh = () => {
    console.log("refresh")
    dispatch({
      type: "REFRESH"
    })};

  return (
    <TodoHeadBlock>
      <NowDate>{dateString}</NowDate>
      <NowDay>{dayName}</NowDay>
      <TaskLeft>
        할 일 {undoneTasks.length}개 남음
        <Refresh onClick={onRefresh}>
          <MdCached />
        </Refresh>
      </TaskLeft>
    </TodoHeadBlock>
  );
}

export default TodoHead;
