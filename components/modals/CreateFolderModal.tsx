import React from 'react';
import { View, Text, TextInput, StyleSheet, Modal, TouchableOpacity } from 'react-native';

type CreateFolderModalProps = {
  visible: boolean;
  folderName: string;
  setFolderName: (name: string) => void;
  onCreate: () => void;
  onCancel: () => void;
};

export const CreateFolderModal: React.FC<CreateFolderModalProps> = ({
  visible,
  folderName,
  setFolderName,
  onCreate,
  onCancel
}) => (
  <Modal visible={visible} transparent animationType="slide">
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Create New Folder</Text>
        <TextInput
          style={styles.input}
          placeholder="Folder Name"
          value={folderName}
          onChangeText={setFolderName}
        />
        <View style={styles.modalButtons}>
          <TouchableOpacity onPress={onCancel}>
            <Text style={styles.modalButton}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onCreate}>
            <Text style={styles.modalButton}>Create</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingBottom: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
  },
  navButton: { color: '#007AFF', marginRight: 12, fontSize: 16 },
  disabled: { color: '#aaa' },
  pathText: { fontWeight: 'bold', fontSize: 16 },
  diskStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    backgroundColor: '#f0f0f0',
  },
  statText: { fontSize: 14 },
  list: { flex: 1, paddingHorizontal: 12, marginVertical: 8 },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ddd',
  },
  itemText: { fontSize: 16 },
  deleteText: { color: '#FF3B30', fontWeight: '600' },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  buttonText: { color: '#fff', fontSize: 16 },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    elevation: 5,
  },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
    marginBottom: 12,
  },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between' },
  modalButton: { fontSize: 16, color: '#007AFF', paddingVertical: 6, paddingHorizontal: 12 },
  detailText: { fontSize: 16, marginBottom: 8 },
});