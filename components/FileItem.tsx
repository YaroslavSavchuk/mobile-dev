import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FileItem, FileDetail } from '@/types/filteTypes';

type FileItemProps = {
  item: FileItem;
  onPress: () => void;
  onDelete: () => void;
  onLongPress: () => void;
};

export const FileItemComponent: React.FC<FileItemProps> = ({ item, onPress, onDelete, onLongPress }) => (
  <TouchableOpacity
    style={styles.itemContainer}
    onPress={onPress}
    onLongPress={onLongPress}
  >
    <Text style={styles.itemText}>
      {item.isDirectory ? '📁 ' : '📄 '}
      {item.name}
    </Text>
    <TouchableOpacity onPress={onDelete}>
      <Text style={styles.deleteText}>Delete</Text>
    </TouchableOpacity>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ddd',
  },
  itemText: { fontSize: 16 },
  deleteText: { color: '#FF3B30', fontWeight: '600' }
});