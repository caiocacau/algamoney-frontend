import React, { useCallback, useEffect, useState } from "react";
import BreadCrumb from "./utils/breadCrumb";
import PageHeader from "./utils/pageHeader";
import { Form, Button, Input, Checkbox, Divider, Row, Col } from "antd";
import eventBus from "../common/EventBus";
import { toast } from "react-toastify";
import userService from "../services/user.service";
import permissaoService from "../services/permissao.service";
import { history } from "../helpers/history";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

function FormUserEdit() {

  const location = useLocation();

  const codigo = location.state?.codigo

  const [form] = Form.useForm();

  const [stateForm, setStateForm] = useState({
    loading: false,
    dadosForm: {
      codigo: 0,
      nome: '',
      email: '',
      senha: '',
      permissoes: []
    }
  });

  const { loading, dadosForm } = stateForm;

  const updateStateForm = useCallback(newProperties => {
    setStateForm(prev => ({ ...prev, ...newProperties }));
  }, []);

  const CheckboxGroup = Checkbox.Group;
  const [options, setOptions] = useState([{ codigo: 0, descricao: '' }]);
  const [checkedList, setCheckedList] = useState([]);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);

  useEffect(() => {
    (async () => {
      try {

        console.log(codigo);

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

  const routes = [
    {
      path: 'home',
      breadcrumbName: 'Home',
    },
    {
      path: 'user',
      breadcrumbName: 'User',
    },
    {
      path: 'user/form',
      breadcrumbName: 'User Form',
    }
  ];

   const handleSubmit = useCallback(async (values) => {

    try {

      updateStateForm({ loading: true });
      values.permissoes = checkedList;

      const newUser = {
        nome: values.nome,
        email: values.email,
        senha: values.senha,
        permissoes: values.permissoes
      }

      // Atualizando registro
      if (!codigo) {
        await userService.insert(newUser);
      } else {
        newUser.codigo = codigo;
        await userService.update(newUser);
      }

      history.push('/user');
      toast.success(`Registro ${codigo ? 'alterado' : 'inserido'} com sucesso!`)

    } catch (err) {
      updateStateForm({ loading: false });
      toast.error(`Erro ao ${codigo ? 'alterar' : 'inserir'} o registro!`)
    }

  }, [checkedList, updateStateForm, codigo]);

  return (
    <>
      <BreadCrumb breadcrumb={routes} />

      <PageHeader
        title="Usuários"
        subtitle="Formulário"
        // buttonsPageHeader={buttonsPageHeader}
        // Ativar o back history
        activeBackHistorty
      />

      <div className="App">
        <header className="App-header">
          <Form autoComplete="off" form={form} onFinish={handleSubmit} labelCol={{ span: 6 }} wrapperCol={{ span: 12 }}>

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
              hasFeedback
            >
              <Input placeholder="Informe o nome" />
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
              hasFeedback
            >
              <Input placeholder="Informe o email" />
            </Form.Item>

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
                    value && value.includes("A")
                      ? Promise.resolve()
                      : Promise.reject("Senha informada deve conter o caractere 'A'")
                }
              ]}
              hasFeedback
            >
              <Input.Password placeholder="Informe a senha" />
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
              hasFeedback
            >
              <Input.Password placeholder="Confirmar senha" />
            </Form.Item>

            <Form.Item
              label="Permissões"
              wrapperCol={{ span: 12 }}
            >
              <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                Selecionar todos
              </Checkbox>
              <Divider />

              { /**************************************************
                Versão anterior sem alinhamento por <Row> and <Col>
                ***************************************************
               <CheckboxGroup options={options} style={{ width: '100%', backgroundColor: 'red' }} value={checkedList?.map(checked => checked.value)} onChange={onChange} > 
               */}

              <CheckboxGroup style={{ width: '100%' }} value={checkedList?.map(checked => checked.codigo)} onChange={onChange} >
                <Row>
                  {options?.map((item) =>
                    <Col span={12}>
                      {/* <Checkbox value={item.value}>{item.label}</Checkbox> */}
                      <Checkbox value={item.codigo}>{item.descricao}</Checkbox>
                    </Col>
                  )}
                </Row>
              </CheckboxGroup>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">Salvar</Button>
            </Form.Item>

          </Form>
        </header>
      </div>
    </>
  );
}

export default FormUserEdit;