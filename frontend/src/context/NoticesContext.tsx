import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Notice {
  id: number;
  title: string;
  content: string;
  date: string;
  priority: string;
  author: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface NoticesContextType {
  notices: Notice[];
  addNotice: (notice: Omit<Notice, 'id' | 'date' | 'status'>) => void;
  deleteNotice: (id: number) => void;
  approveNotice: (id: number) => void;
  rejectNotice: (id: number) => void;
  withdrawNotice: (id: number) => void;
  getApprovedNotices: () => Notice[];
  getPendingNotices: () => Notice[];
}

const NoticesContext = createContext<NoticesContextType | undefined>(undefined);

export const useNotices = () => {
  const context = useContext(NoticesContext);
  if (!context) {
    throw new Error('useNotices must be used within a NoticesProvider');
  }
  return context;
};

export const NoticesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notices, setNotices] = useState<Notice[]>([
    { id: 1, title: 'Mid-term Exam Schedule', content: 'Mid-term exams will be conducted from March 15-20, 2024.', date: '2024-01-15', priority: 'high', author: 'Dr. Smith', status: 'approved' },
    { id: 2, title: 'Library Hours Extended', content: 'Library will remain open until 10 PM during exam period.', date: '2024-01-14', priority: 'medium', author: 'Prof. Johnson', status: 'approved' }
  ]);

  const addNotice = (noticeData: Omit<Notice, 'id' | 'date' | 'status'>) => {
    const newNotice: Notice = {
      id: Date.now(),
      ...noticeData,
      date: new Date().toISOString().split('T')[0],
      status: 'pending'
    };
    setNotices([newNotice, ...notices]);
  };

  const deleteNotice = (id: number) => {
    setNotices(notices.filter(notice => notice.id !== id));
  };

  const approveNotice = (id: number) => {
    setNotices(notices.map(notice => 
      notice.id === id ? { ...notice, status: 'approved' as const } : notice
    ));
  };

  const rejectNotice = (id: number) => {
    setNotices(notices.map(notice => 
      notice.id === id ? { ...notice, status: 'rejected' as const } : notice
    ));
  };

  const withdrawNotice = (id: number) => {
    setNotices(notices.filter(notice => notice.id !== id));
  };

  const getApprovedNotices = () => notices.filter(notice => notice.status === 'approved');
  const getPendingNotices = () => notices.filter(notice => notice.status === 'pending');

  return (
    <NoticesContext.Provider value={{ 
      notices, 
      addNotice, 
      deleteNotice, 
      approveNotice, 
      rejectNotice, 
      withdrawNotice,
      getApprovedNotices,
      getPendingNotices
    }}>
      {children}
    </NoticesContext.Provider>
  );
};