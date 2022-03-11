import { Button, PageHeader as Header, Tooltip } from "antd";

import { history } from '../../helpers/history'

// descricao: 'Usuário',
// tituloToolTip: 'Adicionar',
// icon: <PlusOutlined />,
// size: 'small',
// rota: '/user/form',
// acao: 'insert',
// stateSearch: { nome: 'ia' }

function PageHeader({
    title,
    subtitle,
    buttonsPageHeader,
    activeBackHistory,
    page,
    stateSort,
    stateSearch
}) {

    const extra = [];

    if (buttonsPageHeader) {
        buttonsPageHeader.map((button) => {
            extra.push(
                button.icon ? (
                    <Tooltip key={button.acao} title={button.tituloToolTip}>
                        <Button
                            type="primary"
                            key="button1"
                            shape="circle"
                            style={{ color: 'black', backgroundColor: '#e26565', border: '2px', marginRight: '2px' }}
                            icon={button.icon}
                            size={button.size}
                            onClick={
                                button.rota ? (() => {
                                    (
                                        button.acao ?
                                            (
                                                // estabecendo na lógica que esses componentes são juntos da lógica da table do programa chamador
                                                page || stateSort || stateSearch ?
                                                    history.push(`${button.rota}`, { acao: `${button.acao}`, page, stateSort, stateSearch }) :
                                                    history.push(`${button.rota}`, { acao: `${button.acao}` })
                                            ) :
                                            history.push(`${button.rota}`)
                                    )
                                }) : (() => {
                                    history.push('/')
                                })}
                        />
                        <Button
                            type="link"
                            key="button2"
                            style={{ color: 'black', padding: '5px' }}
                            onClick={
                                button.rota ? (() => {
                                    (
                                        button.acao ?
                                            (
                                                // estabecendo na lógica que esses componentes são juntos da lógica da table do programa chamador
                                                page || stateSort || stateSearch ?
                                                    history.push(`${button.rota}`, { acao: `${button.acao}`, page, stateSort, stateSearch }) :
                                                    history.push(`${button.rota}`, { acao: `${button.acao}` })
                                            ) :
                                            history.push(`${button.rota}`)
                                    )
                                }) : (() => {
                                    history.push('/')
                                })}
                        >
                            {button.descricao}
                        </Button>
                    </Tooltip>
                ) : (
                    <Tooltip key={button.descricao} title={button.tituloToolTip}>
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

    if (activeBackHistory) {
        // props.onBack = () => history.goBack();
        props.onBack = () => history.push({
            pathname: '/user',
            state: {
                page,
                stateSort,
                stateSearch,
            }
        });
    }

    return <Header title={title} subTitle={subtitle} extra={extra} {...props} />;
}

export default PageHeader;