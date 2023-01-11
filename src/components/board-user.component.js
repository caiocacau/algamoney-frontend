import React, { useCallback, useEffect, useState } from "react";

import UserService from "../services/user.service";
import { toast } from "react-toastify";

import { Table } from 'antd';

import { PlusOutlined, HomeOutlined, LoadingOutlined } from '@ant-design/icons';
import eventBus from "../common/EventBus";
import { getColumnSorterProps, getColumnSearchProps, getColumnSearchOptionsProps } from "./utils/tableUtils/index";
import PageHeader from "./utils/pageHeader/index";

// import BreadCrumb from "./utils/breadCrumb/index";
import GroupAcoes from "./utils/acoesTable/groupAcoes";
import tokenService from "../services/token.service";
import Pagination from "./utils/pagination";

export const MODULO_ROUTE = 'user';

export default function BoardUser(props) {

  const currentUser = tokenService.getUser();

  // console.log("currentUser: " + currentUser.email);
  // console.log(currentUser.roles.filter(role => (role === 'ROLE_CADASTRAR_PESSOA')))
  const activePageSizeR = props.location.state?.activePageSize; // Retorno via state para atualização do parametro
  const [activePageSize, setActivePageSize] = useState(6);

  const activePageR = props.location.state?.activePage;
  const [activePage, setActivePage] = useState(0);
  const [page, setPage] = useState({
    dados: [],
    loading: false,
    first: true,
    last: true,
    number: 0,
    totalElements: 0,
    totalPages: 0,
    numberOfElements: 0,
    empty: true
  })

  // Retorno via state do stateSort.activeSort para atualização do parametro, caso contrário sempre será nulo
  const [atualizaSortR, setAtualizaSortR] = useState(props.location.state?.stateSort?.activeSort ? 'N' : null);

  const stateSortR = props.location.state?.stateSort; // Retorno via state para atualização dos parametros
  const [stateSort, setStateSort] = useState(stateSortR ? stateSortR : {
    activeSort: null,
    columnSort: null,
    xcolumnDirectionSort: null, // incialmente coloca assim para ajustar com o defaultSortOrder do columns
  });

  const stateSearchR = props.location.state?.stateSearch; // Retorno via state para atualização dos parametros
  const [stateSearch, setStateSearch] = useState({
    codigo: null,
    nome: '',
    email: '',
    ativos: []
  });

  // Desestruturando o objeto ou seja, tirando as variáveis de dentro do objeto para poder usar diretamente na classe(ex: activeSort ao invés de stateTable.activeSort)
  const { loading, dados, totalElements } = page;

  const { activeSort, columnSort, xcolumnDirectionSort } = stateSort;

  const { codigo, nome, email, ativos } = stateSearch;

  const updatePage = useCallback(newProperties => {
    setPage(prev => ({ ...prev, ...newProperties }));
  }, []);

  const updateStateSort = useCallback(newProperties => {
    setStateSort(prev => ({ ...prev, ...newProperties }));
  }, []);

  const updateStateSearch = useCallback(newProperties => {
    setStateSearch(prev => ({ ...prev, ...newProperties }));
  }, []);

  useEffect(() => {
    if (activePageSizeR) {
      setActivePageSize(activePageSizeR)
    }
  }, [activePageSizeR])

  useEffect(() => {
    if (activePageR) {
      setActivePage(activePageR)
    }
  }, [activePageR])

  useEffect(() => {
    if (stateSearchR) {
      updateStateSearch(stateSearchR)
    }
  }, [updateStateSearch, stateSearchR])

  const loadUsers = useCallback(async () => {
    try {

      updatePage({ loading: true });

      const response = await UserService.getUserBoard(codigo, nome, email, ativos, activePage, activePageSize, atualizaSortR === 'N' && columnSort ? (columnSort + ',' + (xcolumnDirectionSort === 'ascend' ? 'asc' : 'desc')) : activeSort);

      // Caso a página selecionada anteriormente seja maior que o total de paginas, coloca no final
      if (activePage > response.data.totalPages - 1) {
        setActivePage(response.data.totalPages - 1);
      }

      updatePage({
        dados: response.data.content,
        totalElements: response.data.totalElements,
        totalPages: response.data.totalPages,
        last: response.data.last,
        first: response.data.first,
        size: response.data.size,
        number: response.data.number,
        numberOfElements: response.data.numberOfElements,
        empty: response.data.empty
      });


    } catch (err) {
      toast.error(err.message || 'Erro ao carregar dados!');

      if (err.response && err.response.status === 401) {
        eventBus.dispatch("logout");
      }
    } finally {
      updatePage({ loading: false });
    }
  }, [activePage, updatePage, activePageSize, activeSort, atualizaSortR, columnSort, xcolumnDirectionSort, codigo, nome, email, ativos]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);


  const columns = (onDelete => [
    {
      title: 'Código',
      dataIndex: 'codigo',
      key: 'codigo',
      width: '5%',
      align: 'right',
      filteredValue: stateSearch.codigo?.length > 0 ? [stateSearch.codigo] : null,
      sortDirections: ['ascend', 'descend', 'ascend'],
      defaultSortOrder: columnSort === 'codigo' ? (xcolumnDirectionSort !== null ? xcolumnDirectionSort : false) : false,
      ...getColumnSorterProps({ dataIndex: 'codigo', stateSort, updateStateSort, atualizaSortR, setAtualizaSortR, totalElements }),
      ...getColumnSearchProps({ dataIndex: 'codigo', type: 'number', isAtualizarEventOnChange: true, updateStateSearch }),
    },
    {
      title: 'Nome',
      dataIndex: 'nome',
      key: 'nome',
      width: '30%',
      filteredValue: stateSearch.nome?.length > 0 ? [stateSearch.nome] : null,
      sortDirections: ['ascend', 'descend', 'ascend'],
      defaultSortOrder: columnSort === 'nome' ? (xcolumnDirectionSort !== null ? xcolumnDirectionSort : false) : false,
      ...getColumnSorterProps({ dataIndex: 'nome', stateSort, updateStateSort, atualizaSortR, setAtualizaSortR, totalElements }),
      ...getColumnSearchProps({ dataIndex: 'nome', type: 'text', isAtualizarEventOnChange: true, updateStateSearch }),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '20%',
      filteredValue: stateSearch.email?.length > 0 ? [stateSearch.email] : null,
      sortDirections: ['ascend', 'descend', 'ascend'],
      defaultSortOrder: columnSort === 'email' ? (xcolumnDirectionSort !== null ? xcolumnDirectionSort : false) : false,
      ...getColumnSorterProps({ dataIndex: 'email', stateSort, updateStateSort, atualizaSortR, setAtualizaSortR, totalElements }),
      ...getColumnSearchProps({ dataIndex: 'email', type: 'email', isAtualizarEventOnChange: true, updateStateSearch }),
    },
    {
      title: 'Ativo',
      dataIndex: 'ativo',
      key: 'ativo',
      width: '5%',
      align: 'center',
      sortDirections: ['ascend', 'descend', 'ascend'],
      filters: [
        {
          text: 'Sim',
          value: 'S',
          key: 'sim',
        },
        {
          text: 'Não',
          value: 'N',
          key: 'nao',
        },
      ],
      filteredValue: stateSearch.ativos?.length > 0 ? stateSearch.ativos : null,
      defaultSortOrder: columnSort === 'ativo' ? (xcolumnDirectionSort !== null ? xcolumnDirectionSort : false) : false,
      ...getColumnSorterProps({ dataIndex: 'ativo', stateSort, updateStateSort, atualizaSortR, setAtualizaSortR, totalElements }),
      ...getColumnSearchOptionsProps({ dataIndexObjectList: 'ativos', updateStateSearch }),
      render: (text) => (text === 'S' ? 'Sim' : 'Não')
    },
    {
      title: 'Permissões',
      dataIndex: 'permissoes',
      key: 'permissoes',
      width: '30%',
      render: (text, record) =>
        text.map(t => <p key={record.codigo + '_' + t.codigo} style={{ marginBottom: '2px' }} >{t.descricao} </p>)
    },
    {
      title: 'Ações',
      key: 'action',
      width: '10%',
      align: 'center',
      render: (text, record) => (
        <GroupAcoes
          moduloSistema={MODULO_ROUTE}
          record={record}
          onDelete={onDelete}
          activePageSize={activePageSize}
          activePage={activePage}
          stateSort={stateSort}
          stateSearch={stateSearch}
          render={currentUser?.roles.filter(role => (role === 'ROLE_CADASTRAR_PESSOA' || role === 'ROLE_PESQUISAR_PESSOA')).length > 0 && record.codigo > 2}
        />
      ),
    },
  ]);

  // const routes = [
  //   {
  //     path: 'home',
  //     breadcrumbName: 'Home',
  //   },
  //   {
  //     path: 'user',
  //     breadcrumbName: 'User',
  //   }
  // ];

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
      rota: '/user/form',
      acao: 'insert'
    }
  ];

  const handleDelete = useCallback(async record => {
    try {

      updatePage({ loading: true });
      await UserService.delete(record.codigo);
      toast.success('Registro deletado com sucesso!');
      loadUsers();
      updatePage({ loading: false });

    } catch (err) {
      updatePage({ loading: true });
      toast.error('Erro ao deletar registro!');
    }
  }, [loadUsers, updatePage]);

  // function onShowSizeChange(current, pageSize) {
  //   console.log(current, pageSize);
  //   setActivePageSize(pageSize);
  // }

  // function itemRender(current, type, originalElement) {
  //   if (type === 'prev') {
  //     return <a>Anterior</a>;
  //   }
  //   if (type === 'next') {
  //     return <a>Próximo</a>;
  //   }
  //   return originalElement;
  // }

  const changePage = (index) => {
    setActivePage(index);
  }

  const changePageSize = (value) => {
    console.log('value: ', value);
    setActivePage(0);
    setActivePageSize(value);
  }

  return (
    <>
      {/* <BreadCrumb breadcrumb={routes} /> */}

      <PageHeader
        title="Usuários"
        subtitle="Gerenciamento"
        buttonsPageHeader={buttonsPageHeader}
        // Ativar o back history
        // activeBackHistorty
        activePageSize={activePageSize}
        activePage={activePage}
        stateSort={stateSort}
        stateSearch={stateSearch}
      />

      <Table
        bordered
        rowKey="codigo"
        loading={loading}
        pagination={false}
        //   onChange: pageChange => {
        //     setPage(pageChange);
        //   },
        //   showSizeChanger: true,
        //   onShowSizeChange,
        //   pageSize: pageSize,
        //   pageSizeOptions: [6,12,15,20,50],
        //   current: page,
        //   defaultCurrent: page,
        //   total: totalElements,
        //   itemRender,
        // }}
        columns={columns({ onDelete: handleDelete })}
        dataSource={dados} />
      <Pagination page={page} activePageSize={activePageSize} onPageChange={changePage} onPageSizeChange={changePageSize} />
    </>
  );
}