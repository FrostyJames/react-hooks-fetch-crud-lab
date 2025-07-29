import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, setQuestions }) {
  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    }).then(() => {
      setQuestions(questions.filter((q) => q.id !== id));
    });
  }

  function handleUpdate(id, newIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex: parseInt(newIndex) }),
    })
      .then((res) => res.json())
      .then((updatedQuestion) => {
        setQuestions(
          questions.map((q) => (q.id === id ? updatedQuestion : q))
        );
      });
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;