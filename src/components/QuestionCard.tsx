import React from 'react'

type Props = {
    question: string;
    answers: string[];
    callback: any;
    userAnswer: any;
    questionNr: number;
    totalQuestions: number;
}

export default function QuestionCard({ question, answers, callback, userAnswer, questionNr, totalQuestions }: Props) {
    return (
        <div>
            <p className="number">
                Question: {questionNr} / {totalQuestions}
            </p>
            <p dangerouslySetInnerHTML={{__html: question }}></p>
            <div>
                {answers.map((answer) => (
                    <button disabled={userAnswer ? true : false} value={answer} onClick={callback}>
                        <span dangerouslySetInnerHTML={{__html: answer }} />
                    </button>
                ))}
            </div>
        </div>
    )
}
