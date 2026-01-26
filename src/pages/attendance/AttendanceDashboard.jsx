import React, { useState, useEffect } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  LinearProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputAdornment
} from '@mui/material'
import {
  AccessTime,
  LocationOn,
  CheckCircle,
  PlayArrow,
  Stop,
  Schedule,
  TrendingUp,
  Assessment
} from '@mui/icons-material'
import { useAuth } from '../../contexts/AuthContext'
import { mockAttendance, mockUsers } from '../../services/mockData'

const AttendanceDashboard = () => {
  const { user } = useAuth()
  const [todayAttendance, setTodayAttendance] = useState(null)
  const [recentAttendance, setRecentAttendance] = useState([])
  const [isCheckedIn, setIsCheckedIn] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [checkInDialogOpen, setCheckInDialogOpen] = useState(false)
  const [checkOutDialogOpen, setCheckOutDialogOpen] = useState(false)
  const [location, setLocation] = useState('')
  const [notes, setNotes] = useState('')

  useEffect(() => {
    // Get today's attendance for current user
    const today = new Date().toISOString().split('T')[0]
    const attendance = mockAttendance.find(a => 
      a.employeeId === user?.id && a.date === today
    )
    setTodayAttendance(attendance)
    setIsCheckedIn(attendance && !attendance.checkOut)

    // Get recent attendance history
    const recent = mockAttendance
      .filter(a => a.employeeId === user?.id)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 10)
    setRecentAttendance(recent)

    // Update current time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    return () => clearInterval(timer)
  }, [user])

  const handleCheckIn = () => {
    setCheckInDialogOpen(true)
  }

  const handleCheckOut = () => {
    setCheckOutDialogOpen(true)
  }

  const confirmCheckIn = () => {
    // Simulate check-in
    const newAttendance = {
      id: Date.now(),
      employeeId: user.id,
      employeeName: user.name,
      date: new Date().toISOString().split('T')[0],
      checkIn: currentTime.toLocaleTimeString(),
      checkOut: null,
      status: 'present',
      workingHours: 0,
      location: { lat: 40.7128, lng: -74.0060, address: location || 'Office Main Building' }
    }
    
    setTodayAttendance(newAttendance)
    setIsCheckedIn(true)
    setCheckInDialogOpen(false)
    setLocation('')
    setNotes('')
  }

  const confirmCheckOut = () => {
    // Simulate check-out
    const checkInTime = new Date(`2000-01-01 ${todayAttendance.checkIn}`)
    const checkOutTime = new Date(`2000-01-01 ${currentTime.toLocaleTimeString()}`)
    const workingHours = ((checkOutTime - checkInTime) / (1000 * 60 * 60)).toFixed(2)
    
    setTodayAttendance(prev => ({
      ...prev,
      checkOut: currentTime.toLocaleTimeString(),
      workingHours: parseFloat(workingHours)
    }))
    setIsCheckedIn(false)
    setCheckOutDialogOpen(false)
    setNotes('')
  }

  const calculateMonthlyStats = () => {
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    
    const monthAttendance = mockAttendance.filter(a => {
      const attendanceDate = new Date(a.date)
      return a.employeeId === user?.id && 
             attendanceDate.getMonth() === currentMonth &&
             attendanceDate.getFullYear() === currentYear
    })

    const presentDays = monthAttendance.filter(a => a.status === 'present').length
    const totalHours = monthAttendance.reduce((sum, a) => sum + (a.workingHours || 0), 0)
    const avgHours = presentDays > 0 ? (totalHours / presentDays).toFixed(1) : 0

    return {
      presentDays,
      totalHours,
      avgHours
    }
  }

  const monthlyStats = calculateMonthlyStats()

  const getStatusColor = (status) => {
    switch (status) {
      case 'present':
        return '#2e7d32'
      case 'absent':
        return '#d32f2f'
      case 'late':
        return '#ed6c02'
      default:
        return '#757575'
    }
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Attendance Management
      </Typography>

      {/* Current Status Card */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar
                  sx={{
                    bgcolor: isCheckedIn ? '#2e7d32' : '#ed6c02',
                    mr: 2,
                    width: 64,
                    height: 64
                  }}
                >
                  {isCheckedIn ? <CheckCircle sx={{ fontSize: 32 }} /> : <Schedule sx={{ fontSize: 32 }} />}
                </Avatar>
                <Box>
                  <Typography variant="h5" gutterBottom>
                    {isCheckedIn ? 'Currently Checked In' : 'Not Checked In'}
                  </Typography>
                  <Typography variant="h3" color="primary">
                    {currentTime.toLocaleTimeString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {currentTime.toLocaleDateString()}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              {todayAttendance && (
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Today's Attendance
                  </Typography>
                  <Typography variant="h6">
                    Check-in: {todayAttendance.checkIn}
                  </Typography>
                  {todayAttendance.checkOut && (
                    <Typography variant="h6">
                      Check-out: {todayAttendance.checkOut}
                    </Typography>
                  )}
                  {todayAttendance.workingHours > 0 && (
                    <Typography variant="h6">
                      Working Hours: {todayAttendance.workingHours}h
                    </Typography>
                  )}
                </Box>
              )}
            </Grid>
          </Grid>

          <Box mt={3}>
            {!isCheckedIn ? (
              <Button
                variant="contained"
                size="large"
                startIcon={<PlayArrow />}
                onClick={handleCheckIn}
                disabled={!!todayAttendance?.checkOut}
                fullWidth
              >
                Check In
              </Button>
            ) : (
              <Button
                variant="outlined"
                size="large"
                startIcon={<Stop />}
                onClick={handleCheckOut}
                color="error"
                fullWidth
              >
                Check Out
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Monthly Stats */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="overline">
                    Present This Month
                  </Typography>
                  <Typography variant="h4">
                    {monthlyStats.presentDays}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Days
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: '#2e7d32', width: 56, height: 56 }}>
                  <CheckCircle />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="overline">
                    Total Hours
                  </Typography>
                  <Typography variant="h4">
                    {monthlyStats.totalHours}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Hours
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: '#1976d2', width: 56, height: 56 }}>
                  <AccessTime />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="overline">
                    Average Hours
                  </Typography>
                  <Typography variant="h4">
                    {monthlyStats.avgHours}h
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Per day
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: '#ed6c02', width: 56, height: 56 }}>
                  <TrendingUp />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Attendance History */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Recent Attendance History
          </Typography>
          <List>
            {recentAttendance.map((record) => (
              <ListItem key={record.id} alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: getStatusColor(record.status) }}>
                    <AccessTime />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <Typography variant="subtitle2">
                        {new Date(record.date).toLocaleDateString()}
                      </Typography>
                      <Chip
                        label={record.status}
                        size="small"
                        sx={{
                          backgroundColor: getStatusColor(record.status),
                          color: 'white'
                        }}
                      />
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2">
                        Check-in: {record.checkIn} | Check-out: {record.checkOut || 'Not checked out'}
                      </Typography>
                      <Typography variant="body2">
                        Working Hours: {record.workingHours}h
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Location: {record.location?.address || 'N/A'}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* Check-in Dialog */}
      <Dialog open={checkInDialogOpen} onClose={() => setCheckInDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Check In</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOn />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Notes (Optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            margin="normal"
            multiline
            rows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCheckInDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmCheckIn} variant="contained">Check In</Button>
        </DialogActions>
      </Dialog>

      {/* Check-out Dialog */}
      <Dialog open={checkOutDialogOpen} onClose={() => setCheckOutDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Check Out</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Notes (Optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            margin="normal"
            multiline
            rows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCheckOutDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmCheckOut} variant="contained">Check Out</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default AttendanceDashboard
