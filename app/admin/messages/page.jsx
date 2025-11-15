'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiTrash2, FiSearch, FiEye, FiX, FiUser, FiCalendar } from 'react-icons/fi';
import { getAllMessages, deleteMessage, markMessageAsRead } from '@/components/lib/messagesService';

export default function MessagesPage() {
    const [messages, setMessages] = useState([]);
    const [filteredMessages, setFilteredMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    // Fetch messages
    useEffect(() => {
        fetchMessages();
    }, []);

    // Filter messages
    useEffect(() => {
        let filtered = messages;

        // Status filter
        if (filterStatus !== 'all') {
            filtered = filtered.filter(m => m.status === filterStatus);
        }

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(m =>
                m.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                m.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                m.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                m.message?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredMessages(filtered);
    }, [messages, filterStatus, searchTerm]);

    const fetchMessages = async () => {
        try {
            setLoading(true);
            const data = await getAllMessages();
            setMessages(data);
            setFilteredMessages(data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!deleteConfirm) {
            setDeleteConfirm(id);
            return;
        }

        try {
            await deleteMessage(id);
            setMessages(messages.filter(m => m.id !== id));
            setDeleteConfirm(null);
            if (selectedMessage?.id === id) {
                setSelectedMessage(null);
            }
            alert('Mesaj başarıyla silindi!');
        } catch (error) {
            console.error('Error deleting message:', error);
            alert('Mesaj silinirken hata oluştu!');
        }
    };

    const handleViewMessage = async (message) => {
        setSelectedMessage(message);

        // Mark as read if unread
        if (message.status === 'unread') {
            try {
                await markMessageAsRead(message.id);
                setMessages(messages.map(m =>
                    m.id === message.id ? { ...m, status: 'read' } : m
                ));
            } catch (error) {
                console.error('Error marking message as read:', error);
            }
        }
    };

    const unreadCount = messages.filter(m => m.status === 'unread').length;

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-neutral-800 mb-2">Mesajlar</h1>
                    <p className="text-neutral-600">
                        Toplam {filteredMessages.length} mesaj
                        {unreadCount > 0 && (
                            <span className="ml-2 text-rose-600 font-medium">
                                ({unreadCount} okunmamış)
                            </span>
                        )}
                    </p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Search */}
                    <div className="relative">
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 h-5 w-5" />
                        <input
                            type="text"
                            placeholder="Mesaj ara..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                        />
                    </div>

                    {/* Status Filter */}
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    >
                        <option value="all">Tümü</option>
                        <option value="unread">Okunmamış</option>
                        <option value="read">Okunmuş</option>
                    </select>
                </div>
            </div>

            {/* Messages Table */}
            {loading ? (
                <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-8">
                    <div className="animate-pulse space-y-4">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="h-20 bg-neutral-100 rounded" />
                        ))}
                    </div>
                </div>
            ) : filteredMessages.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-12 text-center">
                    <FiMail className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-neutral-800 mb-2">
                        Mesaj Bulunamadı
                    </h3>
                    <p className="text-neutral-600 mb-4">
                        {searchTerm || filterStatus !== 'all'
                            ? 'Filtrelere uygun mesaj bulunmuyor.'
                            : 'Henüz hiç mesaj almadınız.'}
                    </p>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-neutral-50 border-b border-neutral-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-700">
                                        Durum
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-700">
                                        Gönderen
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-700">
                                        Konu
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-700">
                                        Tarih
                                    </th>
                                    <th className="px-6 py-4 text-right text-sm font-semibold text-neutral-700">
                                        İşlemler
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-200">
                                {filteredMessages.map((message) => (
                                    <motion.tr
                                        key={message.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className={`hover:bg-neutral-50 transition-colors cursor-pointer ${message.status === 'unread' ? 'bg-rose-50/30' : ''
                                            }`}
                                        onClick={() => handleViewMessage(message)}
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                {message.status === 'unread' ? (
                                                    <span className="w-2 h-2 bg-rose-500 rounded-full" title="Okunmamış" />
                                                ) : (
                                                    <span className="w-2 h-2 bg-neutral-300 rounded-full" title="Okundu" />
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="font-medium text-neutral-800">
                                                    {message.name || 'İsimsiz'}
                                                </div>
                                                <div className="text-sm text-neutral-500">
                                                    {message.email || 'E-posta yok'}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="max-w-xs">
                                                <div className="font-medium text-neutral-800 truncate">
                                                    {message.subject || 'Konu yok'}
                                                </div>
                                                <div className="text-sm text-neutral-500 truncate">
                                                    {message.message || ''}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-neutral-600">
                                                {message.createdAt}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleViewMessage(message);
                                                    }}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Görüntüle"
                                                >
                                                    <FiEye className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDelete(message.id);
                                                    }}
                                                    className={`p-2 rounded-lg transition-colors ${deleteConfirm === message.id
                                                        ? 'bg-red-600 text-white'
                                                        : 'text-red-600 hover:bg-red-50'
                                                        }`}
                                                    title={deleteConfirm === message.id ? 'Onaylayın' : 'Sil'}
                                                >
                                                    <FiTrash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Message Detail Modal */}
            {selectedMessage && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedMessage(null)}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-neutral-800">Mesaj Detayı</h2>
                            <button
                                onClick={() => setSelectedMessage(null)}
                                className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                            >
                                <FiX className="h-5 w-5 text-neutral-600" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 space-y-6">
                            {/* Sender Info */}
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                        <FiUser className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div className="flex-1">
                                        <label className="text-sm font-medium text-neutral-500 block mb-1">
                                            Gönderen
                                        </label>
                                        <p className="text-neutral-800 font-medium">
                                            {selectedMessage.name || 'İsimsiz'}
                                        </p>
                                        <a
                                            href={`mailto:${selectedMessage.email}`}
                                            className="text-blue-600 hover:text-blue-700 text-sm"
                                        >
                                            {selectedMessage.email}
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-amber-100 rounded-lg">
                                        <FiCalendar className="h-5 w-5 text-amber-600" />
                                    </div>
                                    <div className="flex-1">
                                        <label className="text-sm font-medium text-neutral-500 block mb-1">
                                            Tarih
                                        </label>
                                        <p className="text-neutral-800">
                                            {selectedMessage.createdAt}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-neutral-200 pt-6">
                                <label className="text-sm font-medium text-neutral-500 block mb-2">
                                    Konu
                                </label>
                                <p className="text-lg font-semibold text-neutral-800">
                                    {selectedMessage.subject || 'Konu yok'}
                                </p>
                            </div>

                            <div className="border-t border-neutral-200 pt-6">
                                <label className="text-sm font-medium text-neutral-500 block mb-3">
                                    Mesaj
                                </label>
                                <div className="bg-neutral-50 rounded-lg p-4">
                                    <p className="text-neutral-700 whitespace-pre-wrap leading-relaxed">
                                        {selectedMessage.message || 'Mesaj içeriği yok'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="sticky bottom-0 bg-neutral-50 border-t border-neutral-200 px-6 py-4 flex items-center justify-between">
                            <button
                                onClick={() => {
                                    handleDelete(selectedMessage.id);
                                }}
                                className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                            >
                                Mesajı Sil
                            </button>
                            <a
                                href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                            >
                                Yanıtla
                            </a>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
}

