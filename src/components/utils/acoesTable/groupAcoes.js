import { useHistory } from "react-router-dom";
import { ContainerFlex } from "./styles";

import { Button, Divider } from "antd";
// Popconfirm from antd
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

function GroupAcoes({ moduloSistema, onDelete, record, page, stateSort, stateSearch, render }) {
    const router = useHistory();

    return (
        // Com o render na linha abaixo, o componente só será renderizado caso a condição seja verdadeira
        render && <ContainerFlex >
        {/*Caso queira que o botão apareça desabilitado, comentar a linha acima e descomentar a linha abaixo e o disabled
         </ContainerFlex> */}
            <Button
                // type="primary"
                title="Editar"
                icon={<EditOutlined />}
                // disabled={!render}
                onClick={() =>
                    router.push({
                        pathname: `/${moduloSistema}/form`,
                        state: {
                            acao: 'update',
                            codigo: record.codigo,
                            page,
                            stateSort,
                            stateSearch,
                        }    
                    })
                }
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            />

            <Divider type="vertical" />

            {/* <Popconfirm
                title="Deseja excluir o registro?"
                onConfirm={() => onDelete(record)}
            > */}
                <Button
                    title="Excluir"
                    icon={<DeleteOutlined />}
                    onClick={() =>
                        router.push({
                            pathname: `/${moduloSistema}/form`,
                            state: {
                                acao: 'delete',
                                codigo: record.codigo,
                                page,
                                stateSort,
                                stateSearch,
                            }    
                        })
                    }
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                />
            {/* </Popconfirm> */}
        </ContainerFlex>
    )
}

export default GroupAcoes;