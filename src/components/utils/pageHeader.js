import { Button, PageHeader as Header, Tooltip } from "antd";
import { PlusOutlined, HomeOutlined, SettingFilled, SmileOutlined, LoadingOutlined } from '@ant-design/icons';

import { history } from '../../helpers/history'

function PageHeader({
    onNewRegister,
    title,
    subtitle,
    buttonsPageHeader,
    activeBackHistorty
}) {

    const extra = [];

    if (onNewRegister) {
        buttonsPageHeader.map((button) => {
            extra.push(
                button.icon ? (
                    <Tooltip title={button.tituloToolTip}>
                        <Button
                            type="primary"
                            shape="circle"
                            style={{ color: 'black', backgroundColor: '#e26565', border: '2px', marginRight: '2px' }}
                            icon={button.icon === 'PlusOutlined' ? <PlusOutlined /> : (
                                button.icon === 'HomeOutlined' ? <HomeOutlined /> : (
                                    button.icon === 'SettingFilled' ? <SettingFilled /> : (
                                        button.icon === 'SmileOutlined' ? <SmileOutlined rotate={180} /> : (
                                            button.icon === 'LoadingOutlined' ? <LoadingOutlined /> : ''
                                        )
                                    )
                                )
                            )}
                            size={button.size} />
                        <Button
                            type="link"
                            style={{ color: 'black', padding: '5px' }}
                        >
                            {button.descricao}
                        </Button>
                    </Tooltip>
                ) : (
                    <Tooltip title="adicionar">
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
        //         // *********************
        //         // Outro estilo de botão
        //         // *********************
        //         // <Button
        //         //     type="primary"
        //         //     shape="round"
        //         //     style={{ color: 'black', backgroundColor: '#e26565', border: '2px', marginRight: '2px' }}
        //         //     icon={
        //         //     <PlusOutlined
        //         //     style={{ float: 'left', marginTop: '2px' }}
        //         //     />}>
        //         //     Adicionar
        //         // </Button>
    }

    const props = {};

    if (activeBackHistorty) {
        props.onBack = () => history.goBack();
    }

    return <Header title={title} subTitle={subtitle} extra={extra} {...props} />;
}

export default PageHeader;