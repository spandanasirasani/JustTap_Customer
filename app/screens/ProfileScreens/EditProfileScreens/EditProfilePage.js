import React, { useState, useLayoutEffect, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

const EditProfilePage = ({ navigation }) => {
  const [dob, setDob] = useState(new Date(2003, 3, 3));
  const [showPicker, setShowPicker] = useState(false);
  const [email, setEmail] = useState('svscharitha@gmail.com');
  const [number, setNumber] = useState('+91 9121978725');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Profile Details',
      headerStyle: { backgroundColor: '#fff' },
      headerTintColor: '#000',
      headerTitleStyle: { fontWeight: 'bold' },
    });
  }, [navigation]);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        onPress: () => navigation.replace('WelcomeScreens'),
      },
    ]);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const updatedEmail = navigation.getState()?.routes?.find(
        (route) => route.name === 'EditProfilePage'
      )?.params?.updatedEmail;

      if (updatedEmail) {
        setEmail(updatedEmail);
        navigation.setParams({ updatedEmail: null });
      }
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const updatedNumber = navigation.getState()?.routes?.find(
        (route) => route.name === 'EditProfilePage'
      )?.params?.updatedNumber;

      if (updatedNumber) {
        setNumber(updatedNumber);
        navigation.setParams({ updatedNumber: null });
      }
    });
    return unsubscribe;
  }, [navigation]);

  const handleDateChange = (event, selectedDate) => {
    if (event.type === 'set') {
      setDob(selectedDate || dob);
    }
    setShowPicker(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.profileIcon}>
        <Ionicons name="person-circle-outline" size={80} color="#0F4A97" />
      </TouchableOpacity>

      <View style={styles.section}>
        <Text style={styles.heading}>Name</Text>
        <Text style={styles.info}>Charitha</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Date of Birth</Text>
        <View style={styles.row}>
          <Text style={styles.info}>{dob.toLocaleDateString()}</Text>
          <TouchableOpacity onPress={() => setShowPicker(true)}>
            <Ionicons name="calendar" size={20} color="#0F4A97" />
          </TouchableOpacity>
        </View>
        <View style={styles.line} />
      </View>

      {showPicker && (
        <DateTimePicker
          value={dob}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
          maximumDate={new Date()}
        />
      )}

      <View style={styles.section}>
        <Text style={styles.heading}>Gender</Text>
        <Text style={styles.info}>Female</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Email</Text>
        <TouchableOpacity onPress={() => navigation.navigate('UpdateEmailId', { email })}>
          <View style={styles.row}>
            <Text style={styles.info}>{email}</Text>
            <Ionicons name="chevron-forward-outline" size={20} color="#0F4A97" />
          </View>
        </TouchableOpacity>
        <View style={styles.line} />
      </View>

      <View style={styles.section}>
        <TouchableOpacity onPress={() => navigation.navigate('UpdateMobileNumber', { number })}>
          <View style={styles.row}>
            <Text style={styles.heading}>Mobile</Text>
            <Ionicons name="chevron-forward-outline" size={20} color="#0F4A97" />
          </View>
          <Text style={styles.info}>{number}</Text>
          <View style={styles.line} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('Security')}>
        <View style={styles.row}>
          <Text style={styles.heading}>Security</Text>
          <Ionicons name="chevron-forward-outline" size={20} color="#0F4A97" />
        </View>
        <View style={styles.line} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('PrivacyAndData')}>
        <View style={styles.row}>
          <Text style={styles.heading}>Privacy and Data</Text>
          <Ionicons name="chevron-forward-outline" size={20} color="#0F4A97" />
        </View>
        <View style={styles.line} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={30} color="red" />
        <Text style={styles.logoutText}> Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditProfilePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  profileIcon: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  heading: {
    color: '#0F4A97',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  info: {
    fontSize: 14,
    color: 'gray',
  },
  line: {
    height: 1,
    backgroundColor: '#ccc',
    marginTop: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoutButton: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  logoutText: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
