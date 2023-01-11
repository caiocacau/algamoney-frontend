// eslint prettier
import React, { useCallback, useEffect, useState } from "react";
// import BreadCrumb from "./utils/breadCrumb";
import PageHeader from "./utils/pageHeader/index";
import { Form, Button, Input, Radio, Checkbox, Divider, Row, Col } from "antd";
import eventBus from "../common/EventBus";
import { toast } from "react-toastify";
import userService from "../services/user.service";
import permissaoService from "../services/permissao.service";
import { history } from "../helpers/history";
// import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

function FormUserEdit({ acao, codigo, activePageSize, activePage, stateSort, stateSearch }) {

  // const location = useLocation();

  // const acao = location.state?.acao;

  // console.log('acao 1: ', acao);
  // console.log('stateSearch 1: ', stateSearch);

  const strongPasswordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])");

  const [form] = Form.useForm();

  const [stateForm, setStateForm] = useState({
    loading: false,
    dadosForm: {
      codigo: 0,
      nome: '',
      email: '',
      senha: '',
      ativo: 'S',
      permissoes: []
    }
  });

  // const { loading, dadosForm } = stateForm;
  const { dadosForm } = stateForm;

  const updateStateForm = useCallback(newProperties => {
    setStateForm(prev => ({ ...prev, ...newProperties }));
  }, []);

  const CheckboxGroup = Checkbox.Group;
  const [options, setOptions] = useState([{ codigo: 0, descricao: '' }]);
  const [checkedList, setCheckedList] = useState([]);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);

  const [ajustarSenha, setAjustarSenha] = useState(false);

  const [valueRadioAtivo, setValueRadioAtivo] = React.useState('S');

  useEffect(() => {
    (async () => {
      try {

        updateStateForm({ loading: true });

        // Carregando permissões
        const responsePermissoes = await permissaoService.getListPermissoes();
        let listPermissoes = responsePermissoes.data;
        setOptions(listPermissoes);

        // Carregando dados do usuário
        if (codigo) {
          const responseUser = await userService.getUserById(codigo);
          setStateForm({ dadosForm: responseUser.data })
          // Tem que ser direto do response data pois é assincrono
          let listPermissoesUsuario = responseUser.data.permissoes;
          setCheckedList(listPermissoesUsuario);
          setIndeterminate(!!listPermissoesUsuario.length && listPermissoesUsuario.length < listPermissoes.length);
          setCheckAll(listPermissoesUsuario.length === listPermissoes.length);
        }

      } catch (err) {
        toast.error(err.message || 'Erro ao carregar dados!');

        if (err.response && err.response.status === 401) {
          eventBus.dispatch("logout");
        }
      }
    })();
  }, [codigo, updateStateForm]);

  useEffect(() => {
    form.setFieldsValue(dadosForm)
  }, [form, dadosForm])

  const onChange = list => {
    // setCheckedList(options.filter(op => list.includes(op.value)))
    setCheckedList(options.filter(op => list.includes(op.codigo)))
    setIndeterminate(!!list.length && list.length < options.length);
    setCheckAll(list.length === options.length);
  };

  const onCheckAllChange = e => {
    setCheckedList(e.target.checked ? options : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  function onChangeAlterarSenha(e) {
    setAjustarSenha(e.target.checked);
  }

  const onChangeRadioSimNao = e => {
    setValueRadioAtivo(e.target.value);
  };

  // const routes = [
  //   {
  //     path: 'home',
  //     breadcrumbName: 'Home',
  //   },
  //   {
  //     path: 'user',
  //     breadcrumbName: 'User',
  //   },
  //   {
  //     path: 'user/form',
  //     breadcrumbName: 'User Form',
  //   }
  // ];

  const handleSubmit = useCallback(async (values) => {

    try {
      // console.log(values);
      updateStateForm({ loading: true });
      values.permissoes = checkedList;

      const newUser = {
        nome: values.nome,
        email: values.email,
        senha: values.senha,
        ativo: values.ativo,
        permissoes: values.permissoes
      }

      // Atualizando registro
      if (acao === 'insert') {
        await userService.insert(newUser);
      } else if (acao === 'update') {
        newUser.codigo = codigo;
        await userService.update(newUser);
      } else if (acao === 'delete') {
        await userService.delete(codigo);
      }

      history.push('/user', { activePageSize, activePage, stateSort, stateSearch, sortByState: 'N' });
      toast.success(`Registro ${acao === 'insert' ? 'inserido' : (acao === 'update' ? 'alterado' : 'excluído')} com sucesso!`)

    } catch (err) {
      updateStateForm({ loading: false });
      toast.error(err.response.data[0]?.mensagemUsuario ? err.response.data[0].mensagemUsuario : `Erro ao ${acao === 'insert' ? 'inserir' : (acao === 'update' ? 'alterar' : 'excluir')} o registro!`);
    }

  }, [checkedList, updateStateForm, codigo, acao, activePageSize, activePage, stateSearch, stateSort]);

  const acaoHasFeedback = ['view', 'delete'].indexOf(acao) < 0;
  const acaoDisabled = ['view', 'delete'].indexOf(acao) > 0;
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
    },
  };

  return (
    <>
      {/* <BreadCrumb breadcrumb={routes} /> */}

      <PageHeader 
        title="Usuários"
        subtitle={`- ${acao === 'insert' ? 'Inclusão' : (acao === 'update' ? 'Alteração' : (acao === 'delete' ? 'Exclusão' : 'Detalhamento'))}`}
        // buttonsPageHeader={buttonsPageHeader}
        // Ativar o back history
        activeBackHistory
        activePageSize={activePageSize}
        activePage={activePage}
        stateSort={stateSort}
        stateSearch={stateSearch}
      />

      <div className="App">
        <header className="App-header">
          <Form autoComplete="off" {...formItemLayout} form={form} onFinish={handleSubmit}>

            <Form.Item
              name="nome"
              label="Nome"
              rules={[
                {
                  required: true,
                  message: 'Obrigatório'
                },
                { whitespace: true },
                { min: 3 }
              ]}
              hasFeedback={acaoHasFeedback}
            >
              <Input placeholder="Informe o nome" disabled={acaoDisabled} />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: 'Obrigatório'
                },
                { type: 'email', message: "Email informado inválido" },
              ]}
              hasFeedback={acaoHasFeedback}
            >
              <Input placeholder="Informe o email" disabled={acaoDisabled} />
            </Form.Item>

            {acao === 'update' && <Form.Item
              label="Ajustar senha"
              wrapperCol={{ span: 12 }}
            >
              <Checkbox onChange={onChangeAlterarSenha} />
            </Form.Item>}

            {((acao === 'insert') || (acao === 'update' && ajustarSenha)) &&
              <>
                <Form.Item
                  name="senha"
                  label="Senha"
                  rules={[
                    {
                      required: true,
                      message: 'Obrigatório'
                    },
                    { min: 5 },
                    {
                      validator: (_, value) =>
                        value && value.includes("A") && value.match(strongPasswordRegex)
                          ? Promise.resolve()
                          : Promise.reject("Senha informada deve conter o caractere 'A' e deve ser forte(caracter especial, letras minúsculas, maiúsculas e números)")
                    }
                  ]}
                  hasFeedback={acaoHasFeedback}
                >
                  <Input.Password placeholder="Informe a senha" disabled={acaoDisabled} />
                </Form.Item>

                <Form.Item
                  name="confirmSenha"
                  label="Confirmar Senha"
                  dependencies={["senha"]}
                  rules={[
                    {
                      required: true,
                      message: 'Obrigatório'
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('senha') === value) {
                          return Promise.resolve()
                        }
                        return Promise.reject('Valores diferentes para senha e confirmação')
                      }
                    })
                  ]}
                  hasFeedback={acaoHasFeedback}
                >
                  <Input.Password placeholder="Confirmar senha" disabled={acaoDisabled} />
                </Form.Item>
              </>
            }

            <Form.Item
              label="Ativo"
              name="ativo"
              wrapperCol={{ span: 12 }}
            >
              <Radio.Group onChange={onChangeRadioSimNao} value={valueRadioAtivo} disabled={acaoDisabled}>
                <Radio value={'S'}>Sim</Radio>
                <Radio value={'N'}>Não</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label="Permissões"
              wrapperCol={{ span: 12 }}
            >
              {!acaoDisabled && (
                <div className="checkbox-selecionar-todos">
                  <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                    Selecionar todos
                  </Checkbox>
                  <Divider />
                </div>
              )}

              { /**************************************************
                Versão anterior sem alinhamento por <Row> and <Col>
                ***************************************************
               <CheckboxGroup options={options} style={{ width: '100%', backgroundColor: 'red' }} value={checkedList?.map(checked => checked.value)} onChange={onChange} > 
               */}

              <CheckboxGroup style={{ width: '100%' }} value={checkedList?.map(checked => checked.codigo)} onChange={onChange} disabled={acaoDisabled} >
                <Row>
                  {options?.map((item) =>
                    <Col key={item.codigo} lg={{ span: 12 }} md={{ span: 16 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                      {/* <Checkbox value={item.value}>{item.label}</Checkbox> */}
                      <Checkbox value={item.codigo}>{item.descricao}</Checkbox>
                    </Col>
                  )}
                </Row>
              </CheckboxGroup>
            </Form.Item>

            {['insert', 'update', 'delete'].indexOf(acao) >= 0 &&
              <Form.Item
                wrapperCol={{
                  xs: { span: 24, offset: 0 },
                  sm: { span: 14, offset: 10 },
                }}
              >
                <Button type="primary" htmlType="submit" size="large" style={{ borderRadius: '6px' }}>Salvar</Button>
                <Button
                  type="primary"
                  size="large"
                  style={{ borderRadius: '6px', marginLeft: '5px' }}
                  onClick={() => history.push('/user', { activePageSize, activePage, stateSort, stateSearch, sortByState: 'N' })}
                >
                  Cancelar
                </Button>
              </Form.Item>
            }

          </Form>
        </header>
      </div>
    </>
  );
}

export default FormUserEdit;