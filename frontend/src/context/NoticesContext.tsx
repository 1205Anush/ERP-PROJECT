import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Notice {
  id: number;
  title: string;
  content: string;
  date: string;
  priority: string;
}

interface NoticesContextType {
  notices: Notice[];
  addNotice: (notice: Omit<Notice, 'id' | 'date'>) => void;
  deleteNotice: (id: number) => void;
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
    { id: 1, title: 'Mid-term Exam Schedule', content: 'Mid-term exams will be conducted from March 15-20, 2024.', date: '2024-01-15', priority: 'high' },
    { id: 2, title: 'Library Hours Extended', content: 'Library will remain open until 10 PM during exam period.', date: '2024-01-14', priority: 'medium' },
    { id: 3, title: 'Holiday Notice', content: 'College will remain closed on January 26th for Republic Day.', date: '2024-01-13', priority: 'low' }
  ]);

  const addNotice = (noticeData: Omit<Notice, 'id' | 'date'>) => {
    const newNotice: Notice = {
      id: Date.now(),
      ...noticeData,
      date: new Date().toISOString().split('T')[0]
    };
    setNotices([newNotice, ...notices]);
  };

  const deleteNotice = (id: number) => {
    setNotices(notices.filter(notice => notice.id !== id));
  };

  return (
    <NoticesContext.Provider value={{ notices, addNotice, deleteNotice }}>
      {children}
    </NoticesContext.Provider>
  );
};