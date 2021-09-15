
const PageNotFound = () => {
    const imgStyle = {
        width: '86%',
        height: '100%',
        zIndex: '1',
        position: 'fixed',
        marginLeft: '5%'
    }

    return (
        <div className="container" >
            <img src="404.png" alt="e-invoicing" style={imgStyle}  />
        </div>
    )
}

export default PageNotFound