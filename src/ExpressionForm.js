import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ExpressionForm = ({ onSubmit }) => {
  const [connectorType, setConnectorType] = useState('AND');
  const [expressions, setExpressions] = useState([
    { ruleType: 'Age', operator: '>=', value: '', score: '' },
  ]);

  const handleConnectorTypeChange = (e) => {
    setConnectorType(e.target.value);
  };

  const handleExpressionChange = (index, field, value) => {
    const updatedExpressions = [...expressions];
    updatedExpressions[index][field] = value;
    setExpressions(updatedExpressions);
  };

  const handleAddExpression = () => {
    setExpressions([...expressions, { ruleType: 'Age', operator: '>=', value: '', score: '' }]);
  };

  const handleDeleteExpression = (index) => {
    const updatedExpressions = [...expressions];
    updatedExpressions.splice(index, 1);
    setExpressions(updatedExpressions);
  };

  const handleSubmit = () => {
    const output = {
      rules: expressions.map((expression) => ({
        key: expression.ruleType.toLowerCase(),
        output: {
          value: parseInt(expression.value),
          operator: expression.operator,
          score: parseInt(expression.score),
        },
      })),
      combinator: connectorType.toLowerCase(),
    };
    onSubmit(output);
  };

  return (
    <Container>
      <div class="text-center">
     <h1 class="text-success">Expression Engine UI </h1>   
</div>
      <Form>
        <Form.Group as={Row} controlId="connectorType">
          <Form.Label column sm={2}>
            Connector Type
          </Form.Label>
          <Col sm={10}>
            <Form.Control as="select" value={connectorType} onChange={handleConnectorTypeChange}>
              <option value="AND">AND</option>
              <option value="OR">OR</option>
            </Form.Control>
          </Col>
        </Form.Group>

        {expressions.map((expression, index) => (
          <div key={index}>
            <Form.Group as={Row} controlId={`ruleType${index}`}>
              <Form.Label column sm={2}>
                Rule Type
              </Form.Label>
              <Col sm={4}>
                <Form.Control
                  as="select"
                  value={expression.ruleType}
                  onChange={(e) => handleExpressionChange(index, 'ruleType', e.target.value)}
                >
                  <option value="Age">Age</option>
                  <option value="CreditScore">Credit Score</option>
                  <option value="AccountBalance">Account Balance</option>
                </Form.Control>
              </Col>

              <Form.Label column sm={2}>
                Operator
              </Form.Label>
              <Col sm={2}>
                <Form.Control
                  as="select"
                  value={expression.operator}
                  onChange={(e) => handleExpressionChange(index, 'operator', e.target.value)}
                >
                  <option value=">">{'>'}</option>
                  <option value="<">{'<'}</option>
                  <option value=">=">{'>='}</option>
                  <option value="<=">{'<='}</option>
                  <option value="=">{'='}</option>
                </Form.Control>
              </Col>

              <Form.Label column sm={1}>
                Value
              </Form.Label>
              <Col sm={1}>
                <Form.Control
                  type="number"
                  value={expression.value}
                  onChange={(e) => handleExpressionChange(index, 'value', e.target.value)}
                />
              </Col>

              <Form.Label column sm={1}>
                Score
              </Form.Label>
              <Col sm={2}>
                <Form.Control
                  type="number"
                  value={expression.score}
                  onChange={(e) => handleExpressionChange(index, 'score', e.target.value)}
                />
              </Col>

              <Button variant="danger" onClick={() => handleDeleteExpression(index)} className="ml-2">
                Delete
              </Button>
            </Form.Group>
          </div>
        ))}
         
        
        <div class="text-center"><Button variant="primary" onClick={handleAddExpression} className="mb-3">
         Add Expression
        </Button>
        
        <Button variant="success" onClick={handleSubmit}>
          Submit
        </Button>
        </div>
       
      </Form>
    </Container>
  );
};

export default ExpressionForm;
