import React from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap';
import { Link } from 'react-router-dom';
import PlansList from '../../../components/plans/plansList'
import '../../../components/styles/List.css'

function PanelPlans(props) {
  return (
    <div>
      <div className="container">
        <br />

        <Form className="row justify-content-center" onSubmit={props.onSeachItem}>
          <FormGroup className="col-6">
            <Label for="query">Nombre</Label>
            <Input 
            type="text" 
            name="query" 
            id="query" 
            onChange = {props.onChange}
            placeholder="nombre" required />
          </FormGroup>

          <FormGroup className="col-6">
            <Button className="mr-4"
              type="submit"
              color="primary">Buscar</Button>

            <Link className="btn btn-success" to={`/panelPlansRegistration`}>Registrar</Link>
          </FormGroup>
        </Form>

        <br />
        <br />
        <br />
        <div className="row justify-content-center">
          <Pagination aria-label="Page navigation example">
            <PaginationItem className="mr-4">
              <PaginationLink onClick={props.onPreviousPress} previous></PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationLink onClick={props.onNextPress} next ></PaginationLink>
            </PaginationItem>
          </Pagination>

        </div>
        <br />
        <div className="row">
          <div className="col-12 vCenterItems container">
            <div className="itemsList__container">
              <PlansList stations={props.data} />
            </div>
          </div>
        </div>
      </div>

    </div>

  )
}

export default PanelPlans;