import AppRoutes from '../../config/routes/AppRoutes';

const Container = () => {
    return (
        <div style={{minHeight:'100vh', margin:'80px 0'}}>
            {AppRoutes()}
        </div>
    )
}

export default Container;
