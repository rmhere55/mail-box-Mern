import { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Link, Navigate } from 'react-router-dom';

const Singup = () => {
    const [isAuthenticate, setIsAuthenticate] = useState(false)
    const [formData , setformData ] = useState({
        
    })



  return (
    <div className='d-flex  justify-content-center align-items-center flex-column mt-5'>
      <Card className="w-100" style={{ maxWidth: '400px' }}>
        <Card.Body>
          <h2 className="text-center mb-4">Sign In</h2>
            <Form onSubmit={handleSubmit}>
            <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
              <Form.Control
                type="email"
                placeholder="name@example.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </FloatingLabel>

            <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </FloatingLabel>

            <FloatingLabel controlId="floatingConfirmPassword" label="Confirm Password" className="mb-3">
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </FloatingLabel>

            <Button
              variant="primary"
              type="submit"
              className="w-100 mt-3"
              style={{ borderRadius: '50px' }}
            >
              Sign In
            </Button>
          </Form>
        
</Card.Body>
        </Card>
           <Card className="w-100 mt-4 text-center" style={{ maxWidth: '400px' }}>
        <Card.Body>
            Have an account? <Link to="/login">Login</Link>
        </Card.Body>
      </Card>

      {isAuthenticate && <Navigate to='/' />}
   
    </div>
  )
}

export default Singup