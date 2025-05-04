import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Modal } from 'react-native';

interface TextFileModalProps {
  visible: boolean;
  fileName: string;
  content: string;
  isEditing: boolean;
  setFileName: (name: string) => void;
  setContent: (content: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export const TextFileModal: React.FC<TextFileModalProps> = ({
  visible,
  fileName,
  content,
  isEditing,
  setFileName,
  setContent,
  onSave,
  onCancel,
}) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            {isEditing ? 'Edit Text File' : 'Create New Text File'}
          </Text>

          {!isEditing && (
            <TextInput
              style={styles.input}
              placeholder="File Name (without extension)"
              value={fileName}
              onChangeText={setFileName}
              autoCapitalize="none"
            />
          )}

          <TextInput
            style={[styles.input, styles.contentInput]}
            multiline
            placeholder="Enter file content..."
            value={content}
            onChangeText={setContent}
            textAlignVertical="top"
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onCancel}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={onSave}>
              <Text style={styles.secondButtonText}>{isEditing ? 'Save' : 'Create'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  contentInput: {
    height: 200,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    backgroundColor: '#f0f0f0',
  },
  saveButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#007AFF',
  },
  secondButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#edeeff',
  },
});