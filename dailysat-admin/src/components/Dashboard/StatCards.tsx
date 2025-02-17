"use client"

import axios from "axios";
import React, { useEffect, useState } from "react";

const StatCards = () => {
  const [mathQuestionNumber, setMathQuestionNumber] = useState(0)
  const [readingWritingQuestionNumber, setReadingWritingQuestionNumber] = useState(0)
  const [userCount, setUserCount] = useState(0)

  useEffect(() => {
    const getNumberQuestions = async () => {
      const response = await axios.get("/api/stats")
  
      setMathQuestionNumber(response.data.mathCount)
      setReadingWritingQuestionNumber(response.data.readingWritingCount)
      setUserCount(response.data.userCount)
    }

    getNumberQuestions()
  }, [])



  return (
    <>
      <Card
        title="Math Questions"
        value={mathQuestionNumber.toString()}
      />
      <Card
        title="Reading/Writing Questions"
        value={readingWritingQuestionNumber.toString()}
      />
      <Card
        title="Users"
        value={userCount.toString()}
      />
    </>
  );
};

const Card = ({
  title,
  value,
}: {
  title: string;
  value: string;
}) => {
  return (
    <div className="col-span-4 p-4 rounded border border-stone-300">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-stone-500 mb-2 text-sm">{title}</h3>
          <p className="text-3xl font-semibold">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default StatCards