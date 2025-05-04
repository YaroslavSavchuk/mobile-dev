import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type DiskStatsProps = {
  total: number;
  free: number;
  occupied: number;
};

export const DiskStats: React.FC<DiskStatsProps> = ({ total, free, occupied }) => (
  <View style={styles.diskStats}>
    <Text style={styles.statText}>
      Total: {total ? (total / (1024 * 1024)).toFixed(2) : 'N/A'} MB
    </Text>
    <Text style={styles.statText}>
      Free: {(free / (1024 * 1024)).toFixed(2)} MB
    </Text>
    <Text style={styles.statText}>
      Occupied: {total ? (occupied / (1024 * 1024)).toFixed(2) : 'N/A'} MB
    </Text>
  </View>
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