import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';


type Evenement = {
  id: string;
  titre: string;
  categorie: string;
  capacite: number;
  inscrits: number;
};

const evenements: Evenement[] = [
  { id: 'E01', titre: 'Atelier React', categorie: 'Atelier', capacite: 25, inscrits: 25 },
  { id: 'E02', titre: 'Conférence IA', categorie: 'Conférence', capacite: 70, inscrits: 52 },
  { id: 'E03', titre: 'Sécurité mobile', categorie: 'Atelier', capacite: 20, inscrits: 17 },
  { id: 'E04', titre: 'Design UI', categorie: 'Atelier', capacite: 18, inscrits: 9 },
  { id: 'E05', titre: 'Forum projets', categorie: 'Rencontre', capacite: 50, inscrits: 49 },
  { id: 'E06', titre: 'Découverte Git', categorie: 'Atelier', capacite: 24, inscrits: 24 },
];


const placesRestantes = (e: Evenement) => Math.max(0, e.capacite - e.inscrits);

const statutEvenement = (e: Evenement) => {
  const r = placesRestantes(e);
  if (r === 0) return 'Complet';
  if (r <= 3) return 'Presque complet';
  return 'Ouvert';
};

const total = evenements.length;
const complets = evenements.filter(e => placesRestantes(e) === 0).length;
const placesTotal = evenements.reduce((acc, e) => acc + placesRestantes(e), 0);
const ateliersDispo = evenements.filter(e => e.categorie === 'Atelier' && placesRestantes(e) > 0);


const BadgeEtat = ({ statut }: { statut: string }) => {
  let bg = '#d1fae5'; // Ouvert
  if (statut === 'Complet') bg = '#fee2e2';
  if (statut === 'Presque complet') bg = '#ffedd5';
  return (
    <View style={{ backgroundColor: bg, padding: 4, borderRadius: 5 }}>
      <Text style={{ fontSize: 12 }}>{statut}</Text>
    </View>
  );
};

const CarteEvenement = ({ e }: { e: Evenement }) => (
  <View style={styles.card}>
    <Text style={styles.titre}>{e.titre}</Text>
    <Text>{e.categorie} - {placesRestantes(e)} places</Text>
    <BadgeEtat statut={statutEvenement(e)} />
  </View>
);

const BlocStatistique = ({ label, nombre }: { label: string, nombre: number }) => (
  <View style={styles.stat}>
    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{nombre}</Text>
    <Text>{label}</Text>
  </View>
);


const mode: 'tous' | 'ateliers' = 'ateliers';

export default function App() {
  const liste = mode === 'tous' ? evenements : ateliersDispo;
  return (
    <SafeAreaView style={{ flex: 1, padding: 10 }}>
      <Text style={styles.header}>CampusAgenda</Text>
      
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 }}>
        <BlocStatistique label="Total" nombre={total} />
        <BlocStatistique label="Complets" nombre={complets} />
        <BlocStatistique label="Places libres" nombre={placesTotal} />
      </View>

      <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>
        {mode === 'tous' ? 'Tous les événements' : 'Ateliers disponibles'}
      </Text>

      <FlatList
        data={liste}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <CarteEvenement e={item} />}
        ListEmptyComponent={<Text>Aucun événement.</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', backgroundColor: '#1e3a8a', color: 'white', padding: 10, borderRadius: 8, marginBottom: 10 },
  card: { padding: 12, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginBottom: 8 },
  titre: { fontWeight: 'bold', fontSize: 16 },
  stat: { alignItems: 'center' },
});