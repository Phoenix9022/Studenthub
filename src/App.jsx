import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import './App.css'


const studentData = {
  name: " Prashant Malani",
  id: "STU-2026-001",
  email: "24malanip@rbunagpur.in",
  major: "Computer Science",
  year: "Junior",
  gpa: 8.95,
  avatar: "👨‍🎓"
}

const coursesData = [
  { id: 1, name: "Data Structures", code: "CS301", grade: "A", progress: 85, instructor: "Prof. Kanchan Dhote" },
  { id: 2, name: "Web Development", code: "CS320", grade: "A-", progress: 75, instructor: "Prof. Sana Quazi" },
  { id: 3, name: "Database Systems", code: "CS340", grade: "B+", progress: 65, instructor: "Prof. Deepali Kotambar" },
  { id: 4, name: "Machine Learning", code: "CS450", grade: "A", progress: 90, instructor: "Prof. Dwaramwar" },
]

const assignmentsData = [
  { id: 1, title: "DAA TA", course: "CS301", due: "April 25, 2026", status: "pending" },
  { id: 2, title: "React Portfolio Project", course: "CS320", due: "April 28, 2026", status: "in-progress" },
  { id: 3, title: "Operating Systems Lab", course: "CS340", due: "April 16, 2026", status: "pending" },
  { id: 4, title: "Embedded Systems Lab", course: "CS450", due: "April 10, 2026", status: "completed" },
]

const announcementsData = [
  { id: 1, title: "Endsem Schedule Released", date: "Feb 20, 2026", type: "important" },
  { id: 2, title: "Library Hours Extended", date: "Feb 19, 2026", type: "info" },
  { id: 3, title: "Career Fair Next Week", date: "Feb 18, 2026", type: "event" },
]

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊', path: '/dashboard' },
  { id: 'courses', label: 'Courses', icon: '📚', path: '/courses' },
  { id: 'assignments', label: 'Assignments', icon: '📝', path: '/assignments' },
  { id: 'grades', label: 'Grades', icon: '📈', path: '/grades' },
  { id: 'schedule', label: 'Schedule', icon: '📅', path: '/schedule' },
  { id: 'settings', label: 'Settings', icon: '⚙️', path: '/settings' },
]

const routeIdByPath = tabs.reduce((acc, tab) => {
  acc[tab.path] = tab.id
  return acc
}, {})

function Sidebar({ activeTab, onTabChange }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <span className="logo">🎓</span>
        <h2>StudentHub</h2>
      </div>
      <nav className="sidebar-nav">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            <span className="nav-icon">{tab.icon}</span>
            <span className="nav-label">{tab.label}</span>
          </button>
        ))}
      </nav>
      <div className="sidebar-footer">
        <button className="logout-btn">
          <span>🚪</span> Logout
        </button>
      </div>
    </aside>
  )
}

function Header({ student }) {
  return (
    <header className="header">
      <div className="search-bar">
        <span className="search-icon">🔍</span>
        <input type="text" placeholder="Search courses, assignments..." />
      </div>
      <div className="header-right">
        <button className="notification-btn">
          🔔
          <span className="notification-badge">3</span>
        </button>
        <div className="user-info">
          <span className="user-avatar">{student.avatar}</span>
          <span className="user-name">{student.name}</span>
        </div>
      </div>
    </header>
  )
}

function StatsCard({ icon, label, value, color }) {
  return (
    <div className={`stats-card ${color}`}>
      <div className="stats-icon">{icon}</div>
      <div className="stats-content">
        <h3>{value}</h3>
        <p>{label}</p>
      </div>
    </div>
  )
}

function CourseCard({ course }) {
  return (
    <div className="course-card">
      <div className="course-header">
        <span className="course-code">{course.code}</span>
        <span className={`course-grade grade-${course.grade.replace('+', 'plus').replace('-', 'minus')}`}>
          {course.grade}
        </span>
      </div>
      <h3 className="course-name">{course.name}</h3>
      <p className="course-instructor">👤 {course.instructor}</p>
      <div className="progress-container">
        <div className="progress-header">
          <span>Progress</span>
          <span>{course.progress}%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${course.progress}%` }}></div>
        </div>
      </div>
    </div>
  )
}

function AssignmentItem({ assignment }) {
  const statusColors = {
    'pending': 'status-pending',
    'in-progress': 'status-progress',
    'completed': 'status-completed'
  }

  const statusLabels = {
    'pending': 'Pending',
    'in-progress': 'In Progress',
    'completed': 'Completed'
  }

  return (
    <div className="assignment-item">
      <div className="assignment-info">
        <h4>{assignment.title}</h4>
        <p><span className="course-tag">{assignment.course}</span> • Due: {assignment.due}</p>
      </div>
      <span className={`status-badge ${statusColors[assignment.status]}`}>
        {statusLabels[assignment.status]}
      </span>
    </div>
  )
}

function AnnouncementItem({ announcement }) {
  const typeIcons = {
    'important': '⚠️',
    'info': 'ℹ️',
    'event': '🎉'
  }

  return (
    <div className={`announcement-item ${announcement.type}`}>
      <span className="announcement-icon">{typeIcons[announcement.type]}</span>
      <div className="announcement-content">
        <h4>{announcement.title}</h4>
        <p>{announcement.date}</p>
      </div>
    </div>
  )
}

function Dashboard({ student, courses, assignments, announcements }) {
  return (
    <div className="dashboard">
      <div className="welcome-section">
        <h1>Welcome back, {student.name.split(' ')[0]}! 👋</h1>
        <p>Here's what's happening with your courses today.</p>
      </div>

      <div className="stats-grid">
        <StatsCard icon="📚" label="Enrolled Courses" value={courses.length} color="blue" />
        <StatsCard icon="📝" label="Pending Tasks" value={assignments.filter(a => a.status !== 'completed').length} color="orange" />
        <StatsCard icon="⭐" label="Current CGPA" value={student.gpa} color="green" />
        <StatsCard icon="🏆" label="Tasks Completed" value={assignments.filter(a => a.status === 'completed').length} color="purple" />
      </div>

      <div className="dashboard-grid">
        <section className="courses-section">
          <div className="section-header">
            <h2>My Courses</h2>
            <button className="view-all-btn">View All →</button>
          </div>
          <div className="courses-grid">
            {courses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>

        <aside className="dashboard-sidebar">
          <section className="assignments-section">
            <div className="section-header">
              <h2>Upcoming Assignments</h2>
            </div>
            <div className="assignments-list">
              {assignments.map(assignment => (
                <AssignmentItem key={assignment.id} assignment={assignment} />
              ))}
            </div>
          </section>

          <section className="announcements-section">
            <div className="section-header">
              <h2>Announcements</h2>
            </div>
            <div className="announcements-list">
              {announcements.map(announcement => (
                <AnnouncementItem key={announcement.id} announcement={announcement} />
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  )
}

function CoursesPage({ courses }) {
  return (
    <div className="page">
      <h1>My Courses</h1>
      <p className="page-subtitle">Manage and track your enrolled courses</p>
      <div className="courses-grid full-width">
        {courses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  )
}

function AssignmentsPage({ assignments }) {
  return (
    <div className="page">
      <h1>Assignments</h1>
      <p className="page-subtitle">Track your assignments and deadlines</p>
      <div className="assignments-full-list">
        {assignments.map(assignment => (
          <AssignmentItem key={assignment.id} assignment={assignment} />
        ))}
      </div>
    </div>
  )
}

function GradesPage({ courses }) {
  return (
    <div className="page">
      <h1>Grades</h1>
      <p className="page-subtitle">View your academic performance</p>
      <div className="grades-table-container">
        <table className="grades-table">
          <thead>
            <tr>
              <th>Course Code</th>
              <th>Course Name</th>
              <th>Instructor</th>
              <th>Grade</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course.id}>
                <td>{course.code}</td>
                <td>{course.name}</td>
                <td>{course.instructor}</td>
                <td><span className={`grade-badge grade-${course.grade.replace('+', 'plus').replace('-', 'minus')}`}>{course.grade}</span></td>
                <td>
                  <div className="table-progress">
                    <div className="progress-bar small">
                      <div className="progress-fill" style={{ width: `${course.progress}%` }}></div>
                    </div>
                    <span>{course.progress}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function SchedulePage() {
  const schedule = [
    { day: 'Monday', classes: [{ time: '9:00 AM', course: 'CS301', room: 'Room 101' }, { time: '2:00 PM', course: 'CS320', room: 'Lab 3' }] },
    { day: 'Tuesday', classes: [{ time: '10:00 AM', course: 'CS340', room: 'Room 205' }] },
    { day: 'Wednesday', classes: [{ time: '9:00 AM', course: 'CS301', room: 'Room 101' }, { time: '3:00 PM', course: 'CS450', room: 'Lab 5' }] },
    { day: 'Thursday', classes: [{ time: '10:00 AM', course: 'CS340', room: 'Room 205' }, { time: '2:00 PM', course: 'CS320', room: 'Lab 3' }] },
    { day: 'Friday', classes: [{ time: '11:00 AM', course: 'CS450', room: 'Room 302' }] },
  ]

  return (
    <div className="page">
      <h1>Class Schedule</h1>
      <p className="page-subtitle">Your weekly class schedule</p>
      <div className="schedule-grid">
        {schedule.map(day => (
          <div key={day.day} className="schedule-day">
            <h3>{day.day}</h3>
            <div className="day-classes">
              {day.classes.map((cls, idx) => (
                <div key={idx} className="class-item">
                  <span className="class-time">{cls.time}</span>
                  <span className="class-course">{cls.course}</span>
                  <span className="class-room">{cls.room}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SettingsPage({ student }) {
  return (
    <div className="page">
      <h1>Settings</h1>
      <p className="page-subtitle">Manage your account settings</p>
      <div className="settings-container">
        <div className="settings-section">
          <h3>Profile Information</h3>
          <div className="settings-form">
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" defaultValue={student.name} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" defaultValue={student.email} />
            </div>
            <div className="form-group">
              <label>Student ID</label>
              <input type="text" defaultValue={student.id} disabled />
            </div>
            <div className="form-group">
              <label>Major</label>
              <input type="text" defaultValue={student.major} />
            </div>
          </div>
          <button className="save-btn">Save Changes</button>
        </div>
      </div>
    </div>
  )
}

function App() {
  const location = useLocation()
  const navigate = useNavigate()

  const activeTab = routeIdByPath[location.pathname] || 'dashboard'

  const handleTabChange = (tabId) => {
    const nextPath = tabs.find(tab => tab.id === tabId)?.path || '/dashboard'
    navigate(nextPath)
  }

  return (
    <div className="app">
      <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
      <main className="main-content">
        <Header student={studentData} />
        <div className="content-area">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard student={studentData} courses={coursesData} assignments={assignmentsData} announcements={announcementsData} />} />
            <Route path="/courses" element={<CoursesPage courses={coursesData} />} />
            <Route path="/assignments" element={<AssignmentsPage assignments={assignmentsData} />} />
            <Route path="/grades" element={<GradesPage courses={coursesData} />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/settings" element={<SettingsPage student={studentData} />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}

export default App
