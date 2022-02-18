import { Button, PageHeader as Header, Tooltip } from "antd";

import { history } from '../../helpers/history'

function PageHeader({
    title,
    subtitle,
    buttonsPageHeader,
    activeBackHistorty
}) {

    const extra = [];

    if (buttonsPageHeader) {
        buttonsPageHeader.map((button) => {
            extra.push(
                button.icon ? (
                    <Tooltip title={button.tituloToolTip}>
                        <Button
                            type="primary"
                            shape="circle"
                            style={{ color: 'black', backgroundColor: '#e26565', border: '2px', marginRight: '2px' }}
                            icon={button.icon}
                            size={button.size} 
                            onClick={button.rota ? (() => {history.push(`${button.rota}`)}) : (() => {history.push('/')})}
                            />
                        <Button
                            type="link"
                            style={{ color: 'black', padding: '5px' }}
                            onClick={button.rota ? (() => {history.push(`${button.rota}`)}) : (() => {history.push('/')})}
                        >
                            {button.descricao}
                        </Button>
                    </Tooltip>
                ) : (
                    <Tooltip title={button.tituloToolTip}>
                        <Button
                            type="link"
                            style={{ color: 'black', padding: '5px' }}
                        >
                            {button.descricao}
                        </Button>
                    </Tooltip>
                )
            );
        })
    }

    const props = {};

    if (activeBackHistorty) {
        props.onBack = () => history.goBack();
    }

    return <Header title={title} subTitle={subtitle} extra={extra} {...props} />;
}

export default PageHeader;