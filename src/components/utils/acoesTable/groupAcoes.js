import { useHistory } from "react-router-dom";
import { ContainerFlex } from "./styles";

import { Button, Divider, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

function GroupAcoes({ moduloSistema, onDelete, record }) {
    const router = useHistory();

    return (
        <ContainerFlex>
            <Button
                // type="primary"
                icon={<EditOutlined />}
                onClick={() =>
                    router.push({
                        pathname: `/${moduloSistema}/form`,
                        state: {
                            codigo: record.codigo
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

            <Popconfirm
                title="Deseja excluir o registro?"
                onConfirm={() => onDelete(record)}
            >
                <Button
                    title="danger"
                    icon={<DeleteOutlined />}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                />
            </Popconfirm>
        </ContainerFlex>
    )
}

export default GroupAcoes;