import { useMemo } from 'react';
import { Container, ProgressBar } from 'react-bootstrap';

const PollChoiceDetail = ({ ans, poll }) => {

    let percentage = (ans.votes / poll.total_votes * 100).toFixed(2)
    const isHighest = useMemo(() => {
        for (let i=0; i<poll.choices.length; i++){
            if (poll.choices[i].votes > ans.votes && poll.choices[i].choice_id != ans.choice_id)
            return false
        }
        return true
    }, [])

    return (
        <Container style={{ backgroundColor: "white" }} className='d-flex flex-column mb-3 w-100 p-2'>
            <ProgressBar 
            animated={false}
            style={{ height: "25px" }}
            variant={ isHighest  ? 'success' : 'primary'}
            now={percentage} 
            label={`${percentage}%`} />
            <Container style={{ backgroundColor: "white" }} className='d-flex justify-content-between align-items-center mb-3 rounded p-1 mt-2 w-100'>
                <div className='d-flex justify-content-center h-100 p-1'>
                    <p className={'p-0 m-0'}>{ans.choice_id})</p>
                </div>
                <p className={'m-0 ms-2 w-75 h-100 p-1 lh-sm'}>{ans.choice}</p>
                <p className='m-0 h4'>{ans.votes} {ans.votes > 1 ? "votes" : "vote"}</p>
            </Container>
        </Container>

    )
}

export { PollChoiceDetail };