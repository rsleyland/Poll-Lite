import { Container } from 'react-bootstrap';

const PollChoice = ({ ans, onClick, selected = false }) => {
    return (
        <Container role={'button'} onClick={onClick} style={{ backgroundColor: selected ? "rgba(100,255,100,0.3)" : "white" }}
            className='d-flex justify-content-between align-items-center mb-3 rounded p-2 w-100'>
            <div className='d-flex justify-content-center h-100 p-1'>
                <p className={selected ? "p-0 m-0 text-light" :'p-0 m-0'}>{ans.choice_id})</p>
            </div>
            <p className={selected ? "m-0 ms-2 w-75 h-100 p-1 text-light lh-sm" :'m-0 ms-2 w-75 h-100 p-1 lh-sm'}>{ans.choice}</p>
            <i className='fas fa-check me-2' style={{ visibility: selected ? "visible" : "hidden", color: 'rgba(0, 255, 0, 0.8)' }}></i>
        </Container>

    )
}

export { PollChoice };