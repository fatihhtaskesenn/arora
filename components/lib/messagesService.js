import { supabase } from './supabaseClient';

/**
 * Get all messages from the database
 * @returns {Promise<Array>} Array of message objects
 */
export async function getAllMessages() {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Format messages for display
    return data.map(message => ({
      id: message.id,
      name: message.name,
      email: message.email,
      subject: message.subject,
      message: message.message,
      status: message.status || 'unread',
      createdAt: formatDate(message.created_at),
      rawCreatedAt: message.created_at,
    }));
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
}

/**
 * Get a single message by ID
 * @param {string} id - Message ID
 * @returns {Promise<Object>} Message object
 */
export async function getMessageById(id) {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    return {
      id: data.id,
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      status: data.status || 'unread',
      createdAt: formatDate(data.created_at),
      rawCreatedAt: data.created_at,
    };
  } catch (error) {
    console.error('Error fetching message:', error);
    throw error;
  }
}

/**
 * Create a new message
 * @param {Object} messageData - Message data
 * @returns {Promise<Object>} Created message
 */
export async function createMessage(messageData) {
  try {
    const { data, error } = await supabase
      .from('messages')
      .insert([
        {
          name: messageData.name,
          email: messageData.email,
          subject: messageData.subject,
          message: messageData.message,
          status: 'unread',
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      status: data.status,
      createdAt: formatDate(data.created_at),
    };
  } catch (error) {
    console.error('Error creating message:', error);
    throw error;
  }
}

/**
 * Delete a message
 * @param {string} id - Message ID
 * @returns {Promise<void>}
 */
export async function deleteMessage(id) {
  try {
    const { error } = await supabase
      .from('messages')
      .delete()
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting message:', error);
    throw error;
  }
}

/**
 * Mark a message as read
 * @param {string} id - Message ID
 * @returns {Promise<Object>} Updated message
 */
export async function markMessageAsRead(id) {
  try {
    const { data, error } = await supabase
      .from('messages')
      .update({ status: 'read' })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      status: data.status,
      createdAt: formatDate(data.created_at),
    };
  } catch (error) {
    console.error('Error marking message as read:', error);
    throw error;
  }
}

/**
 * Mark a message as unread
 * @param {string} id - Message ID
 * @returns {Promise<Object>} Updated message
 */
export async function markMessageAsUnread(id) {
  try {
    const { data, error } = await supabase
      .from('messages')
      .update({ status: 'unread' })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      status: data.status,
      createdAt: formatDate(data.created_at),
    };
  } catch (error) {
    console.error('Error marking message as unread:', error);
    throw error;
  }
}

/**
 * Get unread message count
 * @returns {Promise<number>} Count of unread messages
 */
export async function getUnreadCount() {
  try {
    const { count, error } = await supabase
      .from('messages')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'unread');

    if (error) throw error;

    return count || 0;
  } catch (error) {
    console.error('Error fetching unread count:', error);
    return 0;
  }
}

/**
 * Format date for display
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date string
 */
function formatDate(dateString) {
  if (!dateString) return 'Tarih yok';

  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diffTime / (1000 * 60));

  if (diffMinutes < 1) {
    return 'Şimdi';
  } else if (diffMinutes < 60) {
    return `${diffMinutes} dakika önce`;
  } else if (diffHours < 24) {
    return `${diffHours} saat önce`;
  } else if (diffDays < 7) {
    return `${diffDays} gün önce`;
  } else {
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}















