import React, { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  Container,
  Avatar,
  Divider
} from '@mui/material'
import {
  People,
  Business,
  Lock
} from '@mui/icons-material'

const HRLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    // Simulate API call
    setTimeout(() => {
      // Check HR credentials
      if (formData.email === 'hr@company.com' && formData.password === 'hr123') {
        setSuccess('Login successful! Redirecting to HR dashboard...')
        setTimeout(() => {
          window.location.href = '/dashboard/hr'
        }, 1500)
      } else {
        setError('Invalid HR credentials. Please try again.')
      }
      setLoading(false)
    }, 1000)
  }

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Container maxWidth="sm">
        <Card sx={{ 
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          borderRadius: 3,
          overflow: 'hidden'
        }}>
          <CardContent sx={{ p: 4 }}>
            {/* Header */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Avatar sx={{ 
                bgcolor: '#ff9800', 
                width: 80, 
                height: 80, 
                mx: 'auto', 
                mb: 2 
              }}>
                <People sx={{ fontSize: 40 }} />
              </Avatar>
              <Typography variant="h4" color="#ff9800" gutterBottom>
                HR Portal
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Human Resources Login
              </Typography>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* Error/Success Messages */}
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}
            {success && (
              <Alert severity="success" sx={{ mb: 3 }}>
                {success}
              </Alert>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="HR Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                sx={{ mb: 3 }}
                placeholder="hr@company.com"
              />
              
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                sx={{ mb: 3 }}
                placeholder="Enter your password"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ 
                  bgcolor: '#ff9800',
                  '&:hover': { bgcolor: '#f57c00' },
                  py: 1.5,
                  fontSize: '16px'
                }}
              >
                {loading ? 'Signing in...' : 'Sign In as HR'}
              </Button>
            </form>

            {/* Demo Credentials */}
            <Box sx={{ mt: 3, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                <strong>Demo Credentials:</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Email: hr@company.com
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Password: hr123
              </Typography>
            </Box>

            {/* Navigation Links */}
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Not HR?{' '}
                <Button 
                  href="/login/admin" 
                  color="primary"
                  sx={{ textTransform: 'none' }}
                >
                  Admin Login
                </Button>
                {' | '}
                <Button 
                  href="/login/employee" 
                  color="primary"
                  sx={{ textTransform: 'none' }}
                >
                  Employee Login
                </Button>
              </Typography>
            </Box>

            {/* HR Features */}
            <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Business sx={{ fontSize: 16, color: '#666' }} />
              <Typography variant="caption" color="text.secondary">
                Access employee management and HR analytics
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  )
}

export default HRLogin
