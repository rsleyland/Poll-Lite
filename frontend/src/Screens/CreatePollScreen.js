import { useState } from 'react';
import { Container, Form, Button, Tooltip, OverlayTrigger, Col } from 'react-bootstrap';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const CreatePollScreen = () => {

    const [question, setQuestion] = useState("")
    const [choices, setChoices] = useState(["", ""])
    const navigate = useNavigate();

    const updateChoices = (index, value) => {
        setChoices(prev => prev.map((a, i) => (i === index) ? value : a))
    }

    const addChoice = () => {
        setChoices(prev => [...prev, ""])
    }

    const removeChoice = (index) => {
        setChoices(prev => prev.filter((_, i) => i != index))
    }

    const cleanChoice = (index) => {
        setChoices(prev => prev.map((a, i) => (i === index) ? "" : a))
    }

    const renderTooltip = (text) => (
        <Tooltip id="button-tooltip" style={{ position: "fixed" }}>
            {text}
        </Tooltip>
    );

    const handleCreatePoll = async (e) => {
        e.preventDefault()
        try {

            if (question === "") throw Error("Question blank")
            if (choices.length === 2 && (choices[0] === "" || choices[1] === "")) throw Error("Choices blank")
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const data = await axios.post(
                "/api/poll/create/", {
                question: question,
                choices: choices.map((a, i) => ({ "choice": a, "choice_id": String.fromCharCode(65 + i) }))
            },
                config
            );
            navigate(`/poll/${data.data.poll.name}/`)
        }
        catch (err) {
            console.error(`${err}`)
        }
    }



    return (
        <Container fluid className='p-0 bg-light' style={{ height: "calc(100vh - 60px)" }}>
            <Container className='pt-2 d-flex justify-content-center'>
                <Col xs={12} md={10} xl={8}>
                    <Form onSubmit={handleCreatePoll}>
                    <p className='display-6'>Create new poll</p>
                        <Form.Group className="mb-2" controlId="formQuestion">
                            <Form.Label className='h4 mt-2'>Question</Form.Label>
                            <Container fluid className='p-0 mb-2 d-flex'>
                                <Form.Control
                                    as={'textarea'}
                                    style={{ height: '36px' }}
                                    value={question}
                                    type="text"
                                    placeholder="Enter question"
                                    name="question"
                                    onChange={(e) => setQuestion(e.target.value)}
                                    autoFocus={true}
                                />
                                <OverlayTrigger
                                    placement="bottom"
                                    delay={{ show: 200, hide: 200 }}
                                    overlay={renderTooltip("Erase")}
                                >
                                    <Button className='ms-2' variant="warning" type="button" onClick={() => setQuestion("")} style={{ display: question===""? "none" :"block" }}>
                                        <i className="fas fa-eraser"></i>
                                    </Button>
                                </OverlayTrigger>
                                <Button className='ms-2' style={{ visibility: "hidden" }} variant="danger" type="button">
                                    <i className="fas fa-trash-can"></i>
                                </Button>
                            </Container>
                        </Form.Group>

                        {choices.map((x, i) => (
                            <Form.Group className="mb-2" controlId="formChoice" key={`choice-input-${String.fromCharCode(65 + i)}`}>
                                <Form.Label className='h5 mt-2'>Choice {String.fromCharCode(65 + i)}</Form.Label>
                                <Container fluid className='p-0 mb-2 d-flex'>
                                    <Form.Control
                                        as={'textarea'}
                                        type="text"
                                        style={{ height: '36px' }}
                                        placeholder={`Choice ${String.fromCharCode(65 + i)}`}
                                        name={`choice${String.fromCharCode(65 + i)}`}
                                        value={x}
                                        onChange={(e) => updateChoices(i, e.target.value)} />
                                    <OverlayTrigger
                                        placement="bottom"
                                        delay={{ show: 200, hide: 200 }}
                                        overlay={renderTooltip("Erase")}
                                    >
                                        <Button className='ms-2' variant="warning" type="button" onClick={() => cleanChoice(i)} style={{ display: choices[i]===""? "none" :"block" }}>
                                            <i className="fas fa-eraser"></i>
                                        </Button>
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                        placement="bottom"
                                        delay={{ show: 200, hide: 200 }}
                                        overlay={renderTooltip("Remove")}
                                    >
                                        <Button className='ms-2' variant="danger" type="button" onClick={() => removeChoice(i)} style={{ visibility: i <= 1 ? "hidden" :"visible" }}>
                                            <i className="fas fa-trash-can"></i>
                                        </Button>
                                    </OverlayTrigger>
                                </Container>
                            </Form.Group>
                        ))
                        }

                        <Container fluid className='p-0 mb-2 mt-3'>
                            <Button variant="primary" type="button" onClick={addChoice}>
                                <i className="fas fa-plus"></i> Add choice
                            </Button>
                        </Container>

                        <Container fluid className='p-0 d-flex justify-content-center'>
                            <Button variant="success" type="submit" className='my-4 px-md-4 px-0 w-50 fs-5'>
                                Create Poll
                            </Button>
                        </Container>


                    </Form>
                </Col>
            </Container>

        </Container>
    )
}

export { CreatePollScreen };