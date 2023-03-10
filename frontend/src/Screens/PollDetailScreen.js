import { useEffect, useState } from 'react';
import { Container, Button, Col, Row, Spinner,  } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { PollChoiceDetail } from '../Components/PollChoiceDetail';

const PollDetailScreen = () => {

    const params = useParams();
    const [poll, setPoll] = useState(null);
    const [loading, setLoading] = useState(true);
    const [socketUrl, setSocketUrl] = useState(`ws://127.0.0.1:8000/ws/poll/${params.name}/`);


    const { sendMessage, lastMessage, readyState } = useWebSocket(
        socketUrl, {}
    );

    useEffect(() => {
        if (lastMessage !== null) {
            let json = JSON.parse(lastMessage.data)
            if (json.type == "send_poll") {
                setPoll(json.poll)
            }
        }
    }, [lastMessage, setPoll]);


    useEffect(()=> {
        if (poll) setLoading(true)
    }, [poll])



    return (
        <Container fluid>
            <Row className='justify-content-center'>
                <Col xs={12} md={10} xl={8}>
                    <Container className='mt-3 bg-dark rounded w-100'>
                        <div className='d-flex justify-content-evenly align-items-center p-2'>
                            <p className='text-light m-0 fs-5'>Share:</p>
                            <p className='text-light m-0'>{window.location.href.substring(0, window.location.href.length-8)}</p>
                            <Button size='sm' onClick={() => navigator.clipboard.writeText(window.location.href.substring(0, window.location.href.length-8))}><i className='fas fa-link'></i> Copy link</Button>
                        </div>
                    </Container>
                    <Container className='mt-4 bg-dark rounded pb-1 w-100 d-flex justify-content-center'>
                        {poll ?
                            <div className='p-2'>
                                <p className='display-6 text-light'>{poll.question}?</p>
                                {poll.choices.map((a, i) => (
                                    <PollChoiceDetail key={`poll-choice-${i}`} ans={a} poll={poll} />
                                ))}
                            </div>
                            : loading ? <Spinner variant="light" className='my-4 h5' animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </Spinner> :
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

export { PollDetailScreen };

