import React, { useCallback, useEffect, useState } from "react";

import UserService from "../services/user.service";
import { toast } from "react-toastify";

import { Table } from 'antd';

import { PlusOutlined, HomeOutlined, LoadingOutlined } from '@ant-design/icons';
import eventBus from "../common/EventBus";
import { getColumnSorterProps, getColumnSearchProps } from "./utils/tableUtils";
import PageHeader from "./utils/pageHeader";

import BreadCrumb from "./utils/breadCrumb";
import GroupAcoes from "./utils/acoesTable/groupAcoes";
import tokenService from "../services/token.service";

const PAGE_SIZE = 6;

export const MODULO_ROUTE = 'user';

export default function BoardUser() {

  const currentUser = tokenService.getUser();

  // console.log("currentUser: " + currentUser.email);
  // console.log(currentUser.roles.filter(role => (role === 'ROLE_CADASTRAR_PESSOA')))

  const [page, setPage] = useState(1);

  const [stateTable, setStateTable] = useState({
    loading: false,
    dados: [],
    totalElements: 0,
    activeSort: 'codigo',
    columnSort: 'codigo',
    columnDirectionSort: 'asc',
  });

  const [stateSearch, setStateSearch] = useState({
    codigo: 0,
    nome: '',
    email: '',
  });

  // Desestruturando o objeto ou seja, tirando as variáveis de dentro do objeto para poder usar diretamente na classe(ex: activeSort ao invés de stateTable.activeSort)
  const { loading, dados, totalElements, activeSort } = stateTable;

  const { codigo, nome, email } = stateSearch;

  const updateStateTable = useCallback(newProperties => {
    setStateTable(prev => ({ ...prev, ...newProperties }));
  }, []);

  const updateStateSearch = useCallback(newProperties => {
    setStateSearch(prev => ({ ...prev, ...newProperties }));
  }, []);

  const loadUsers = useCallback(async () => {
    try {

      updateStateTable({ loading: true });

      // console.log(page);

      const response = await UserService.getUserBoard(codigo, nome, email, page - 1, PAGE_SIZE, activeSort);

      // console.log(response.data)

      updateStateTable({
        dados: response.data.content,
        totalElements: response.data.totalElements
      });

    } catch (err) {
      toast.error(err.message || 'Erro ao carregar dados!');

      if (err.response && err.response.status === 401) {
        eventBus.dispatch("logout");
      }
    } finally {
      updateStateTable({ loading: false });
    }
  }, [page, codigo, nome, email, activeSort, updateStateTable]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const columns = (onDelete => [
    {
      title: 'Código',
      dataIndex: 'codigo',
      key: 'codigo',
      width: '10%',
      sortDirections: ['ascend', 'descend', 'ascend'],
      ...getColumnSorterProps({ dataIndex: 'codigo', stateTable, updateStateTable }),
      ...getColumnSearchProps({ dataIndex: 'codigo', type: 'number', isAtualizarEventOnChange: true, updateStateSearch }),
    },
    {
      title: 'Nome',
      dataIndex: 'nome',
      key: 'nome',
      width: '30%',
      sortDirections: ['ascend', 'descend', 'ascend'],
      ...getColumnSorterProps({ dataIndex: 'nome', stateTable, updateStateTable }),
      ...getColumnSearchProps({ dataIndex: 'nome', type: 'text', isAtualizarEventOnChange: true, updateStateSearch }),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '20%',
      sortDirections: ['ascend', 'descend', 'ascend'],
      ...getColumnSorterProps({ dataIndex: 'email', stateTable, updateStateTable }),
      ...getColumnSearchProps({ dataIndex: 'email', type: 'email', isAtualizarEventOnChange: true, updateStateSearch }),
    },
    {
      title: 'Permissões',
      dataIndex: 'permissoes',
      key: 'permissoes',
      width: '40%',
      render: (text) =>
        text.map(t => <p key={t.codigo} style={{ marginBottom: '2px' }} >{t.descricao} </p>)
    },
    {
      title: 'Ações',
      key: 'action',
      align: 'center',
      render: (text, record) => (
        <GroupAcoes
          moduloSistema={MODULO_ROUTE}
          record={record}
          onDelete={onDelete}
          render={currentUser.roles.filter(role => (role === 'ROLE_CADASTRAR_PESSOA' || role === 'ROLE_PESQUISAR_PESSOA')).length > 0 && record.codigo === 5}
        />
      ),
    },
  ]);

  const routes = [
    {
      path: 'home',
      breadcrumbName: 'Home',
    },
    {
      path: 'user',
      breadcrumbName: 'User',
    }
  ];

  const buttonsPageHeader = [
    {
      descricao: 'Não identificado',
      // tituloToolTip: '',
      icon: <HomeOutlined />,
      size: 'large'
    },
    {
      descricao: 'Desconhecido',
      // tituloToolTip: '',
      icon: <LoadingOutlined />,
      size: 'medium'
    },
    {
      descricao: 'Usuário',
      tituloToolTip: 'Adicionar',
      icon: <PlusOutlined />,
      size: 'small',
      rota: '/user/form'
    }
  ];

  const handleDelete = useCallback(async record => {
    try {

      updateStateTable({ loading: true });
      await UserService.delete(record.codigo);
      toast.success('Registro deletado com sucesso!');
      loadUsers();
      updateStateTable({ loading: false });

    } catch (err) {
      updateStateTable({ loading: true });
      toast.error('Erro ao deletar registro!');
    }
  }, []);

  return (
    <>
      <BreadCrumb breadcrumb={routes} />

      <PageHeader
        title="Usuários"
        subtitle="Gerenciamento"
        buttonsPageHeader={buttonsPageHeader}
      // Ativar o back history
      // activeBackHistorty
      />
      <Table
        rowKey="codigo"
        loading={loading}
        pagination={{
          onChange: pageChange => {
            setPage(pageChange);
          },
          pageSize: PAGE_SIZE,
          current: page,
          defaultCurrent: page,
          total: totalElements
        }}
        columns={columns({ onDelete: handleDelete })}
        dataSource={dados} />
    </>
  );
}