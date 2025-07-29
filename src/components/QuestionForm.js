import React, { useState } from "react";

function QuestionForm({ questions, setQuestions }) {
  const [formData, setFormData] = useState({
    prompt: "",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    correctIndex: 0,
  });

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newQuestion = {
      prompt: formData.prompt,
      answers: [
        formData.answer1,
        formData.answer2,
        formData.answer3,
        formData.answer4,
      ],
      correctIndex: parseInt(formData.correctIndex),
    };

    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newQuestion),
    })
      .then((res) => res.json())
      .then((addedQuestion) => {
        setQuestions([...questions, addedQuestion]);
        setFormData({
          prompt: "",
          answer1: "",
          answer2: "",
          answer3: "",
          answer4: "",
          correctIndex: 0,
        });
      });
  }

  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit}>
        {/* form fields */}
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;