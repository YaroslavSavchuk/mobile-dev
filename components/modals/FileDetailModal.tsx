import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Modal } from 'react-native';
import { FileDetail } from '@/types/filteTypes';

interface FileDetailModalProps {
  visible: boolean;
  fileDetail: FileDetail | null;
  onClose: () => void;
}

export const FileDetailModal: React.FC<FileDetailModalProps> = ({
  visible,
  fileDetail,
  onClose,
}) => {
  const getFileType = () => {
    if (!fileDetail) return '';
    if (fileDetail.isDirectory) return 'Folder';
    const ext = fileDetail.name.split('.').pop();
    return ext ? `${ext.toUpperCase()} File` : 'File';
  };

  const formatSize = (size: number) => {
    if (size === 0) return '0 KB';
    return `${(size / 1024).toFixed(2)} KB`;
  };

  const formatDate = (timestamp?: number) => {
    if (!timestamp) return 'Unknown';
    return new Date(timestamp).toLocaleString();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>File Details</Text>

          {fileDetail && (
            <View style={styles.detailContainer}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Name:</Text>
                <Text style={styles.detailValue}>{fileDetail.name}</Text>
              </View>
              
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Type:</Text>
                <Text style={styles.detailValue}>{getFileType()}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Size:</Text>
                <Text style={styles.detailValue}>{formatSize(fileDetail.size)}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Last Modified:</Text>
                <Text style={styles.detailValue}>
                  {formatDate(fileDetail.modificationTime)}
                </Text>
              </View>
            </View>
          )}

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}:</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

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
    marginBottom: 20,
    color: '#333',
  },
  detailContainer: {
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  detailLabel: {
    fontSize: 16,
    color: '#666',
    marginRight: 10,
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
    flexShrink: 1,
  },
  closeButton: {
    marginTop: 20,
    alignSelf: 'flex-end',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  closeButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '500',
  },
});