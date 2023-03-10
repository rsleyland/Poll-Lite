import { useEffect, useState } from 'react';
import { Container, Button, Col, Row, Toast, ToastContainer } from 'react-bootstrap';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios'
import { PollChoice } from '../Components/PollChoice';

const PollVotingScreen = () => {

    const params = useParams();
    const navigate = useNavigate();
    const [poll, setPoll] = useState(null);
    const [selectedChoices, setSelectedChoices] = useState([]);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        if (params.name) handleGetPoll();
    }, [params])


    const handleGetPoll = async () => {
        try {
            const config = { headers: { "Content-type": "application/json" } };
            const response = await axios.get(`/api/poll/get/${params.name}/`, config);
            console.log(response)
            setPoll(response.data.poll)
        }
        catch (err) {
            console.log(`Error: ${err}`)
        }
    }

    const handleSelectChoice = (choice_id) => {
        if (selectedChoices.includes(choice_id))
            setSelectedChoices(prev => prev.filter(c => c != choice_id))
        else setSelectedChoices(prev => [...prev, choice_id])
    }

    const handleSubmitChoices = async () => {

        if (selectedChoices.length === 0) return

        try {
            const config = { headers: { "Content-type": "application/json" } };
            const response = await axios.post(`/api/poll/vote/`, {
                choices: selectedChoices,
                poll_name: params.name
            }, config);
            console.log(response)
            navigate("detail/")
        }
        catch (err) {
            console.log(`Error: ${err}`)
        }
    }
    return (
        <Container fluid>
            <ToastContainer onClick={() => setShowToast(false)} position="top-end" className="p-2">
                <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
                    <Toast.Header>
                        <small className="text-muted me-auto">Notification</small>
                    </Toast.Header>
                    <Toast.Body className='bg-light fs-6'>Poll link copied to clipboard</Toast.Body>
                </Toast>
            </ToastContainer>

            <Row className='justify-content-center'>
                <Col xs={12} md={10} xl={8}>
                    <Container className='mt-3 bg-dark rounded w-100'>
                        <div className='d-flex justify-content-evenly align-items-center p-2'>
                            <p className='text-light m-0 fs-5'>Share:</p>
                            <p className='text-light m-0'>{window.location.href.substring(0, window.location.href.length - 1)}</p>
                            <Button size='sm'
                                onClick={() => { navigator.clipboard.writeText(window.location.href.substring(0, window.location.href.length - 1)); setShowToast(true) }}>
                                <i className='fas fa-link'></i> Copy link
                            </Button>
                        </div>
                    </Container>
                    <Container className='mt-4 bg-dark rounded pb-1 w-100'>
                        {poll ?
                            <div className='p-2'>
                                <p className='display-6 text-light'>{poll.question}?</p>
                                <p className='text-light'>Select at least one choice below</p>
                                {poll.choices.map((a, i) => (
                                    <PollChoice selected={selectedChoices.includes(a.choice_id)} onClick={() => handleSelectChoice(a.choice_id)} key={`poll-choice-${i}`} ans={a} />
                                ))}
                                <div className='d-flex justify-content-center'>
                                    <Button variant='success' className='text-center w-50 my-3' onClick={handleSubmitChoices}>Submit</Button>
                                </div>
                            </div>
                            :
                            <>
                                <p className='display-6 text-center text-light'>No poll found</p>
                                <p className='display-6 text-center text-light'>Link incorrect or expired</p>
                            </>
                        }
                    </Container>
                </Col>
            </Row>



        </Container>
    )
}

export { PollVotingScreen };

