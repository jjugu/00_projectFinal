import error from '../../image/error.png'
import { useNavigate } from 'react-router-dom';

function Error() {
    const navigate = useNavigate();

    setTimeout(() => {
        navigate('/', { replace: true});
    }, 3000);

    return(
        <>
            <img src ={error} width='1600px'/>
        </>
    );
}

export default Error;