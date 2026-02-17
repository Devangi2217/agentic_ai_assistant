import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const screenLabels = {
  overview: 'Overview',
  workflow: 'Workflow',
  tooling: 'Tooling',
  validation: 'Validation',
  datavault: 'DataVault',
};

const workflowSteps = [
  { id: 'parse', title: 'Parse Intent', note: 'Extract constraints + deliverables.' },
  { id: 'plan', title: 'Plan Goals', note: 'Break into atomic tasks.' },
  { id: 'route', title: 'Select Tools', note: 'Match tasks to tools.' },
  { id: 'execute', title: 'Execute + Verify', note: 'Run tools + validate outputs.' },
];

export default function App() {
  const [active, setActive] = useState('overview');

  const Screen = useMemo(() => {
    switch (active) {
      case 'workflow':
        return WorkflowScreen;
      case 'tooling':
        return ToolingScreen;
      case 'validation':
        return ValidationScreen;
      case 'datavault':
        return DataVaultScreen;
      case 'overview':
      default:
        return OverviewScreen;
    }
  }, [active]);

  return (
    <View style={styles.app}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.headerEyebrow}>Agentic AI Assistant</Text>
        <Text style={styles.headerTitle}>Tool Orchestration</Text>
        <Text style={styles.headerSubtitle}>
          Autonomous goal decomposition, dynamic tool routing, and validation loops.
        </Text>
      </View>
      <View style={styles.content}>
        <Screen />
      </View>
      <View style={styles.nav}>
        {Object.entries(screenLabels).map(([key, label]) => (
          <Pressable
            key={key}
            onPress={() => setActive(key)}
            style={[styles.navButton, active === key && styles.navButtonActive]}
          >
            <Text style={[styles.navText, active === key && styles.navTextActive]}>
              {label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

function OverviewScreen() {
  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Framework Summary</Text>
        <Text style={styles.cardCopy}>
          Custom agent that decomposes tasks, orchestrates tools, and validates outputs
          with dual-LLM verification.
        </Text>
      </View>
      <View style={styles.grid}>
        <Metric label="Goals Planned" value="14" note="Active workflows" />
        <Metric label="Tools Routed" value="9" note="Regex routing" />
        <Metric label="Validation Pass" value="96%" note="Last 24h" />
        <Metric label="Context Saved" value="38%" note="DataVault offload" />
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Highlights</Text>
        <Text style={styles.cardCopy}>• Kotlin + Jetpack Compose runtime</Text>
        <Text style={styles.cardCopy}>• External DataVault storage layer</Text>
        <Text style={styles.cardCopy}>• Regex-based tool orchestration</Text>
        <Text style={styles.cardCopy}>• Dual-LLM verification loop</Text>
      </View>
    </ScrollView>
  );
}

function Metric({ label, value, note }) {
  return (
    <View style={styles.metricCard}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricNote}>{note}</Text>
    </View>
  );
}

function WorkflowScreen() {
  const [status, setStatus] = useState({
    parse: 'Pending',
    plan: 'Pending',
    route: 'Pending',
    execute: 'Pending',
  });

  const cycleStatus = (id) => {
    setStatus((prev) => {
      const order = ['Pending', 'Running', 'Done'];
      const current = prev[id];
      const next = order[(order.indexOf(current) + 1) % order.length];
      return { ...prev, [id]: next };
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Workflow Steps</Text>
        <Text style={styles.cardCopy}>Tap a step to cycle its status.</Text>
      </View>
      {workflowSteps.map((step) => (
        <Pressable key={step.id} onPress={() => cycleStatus(step.id)} style={styles.stepCard}>
          <View style={styles.stepHeader}>
            <Text style={styles.stepTitle}>{step.title}</Text>
            <Text style={styles.stepStatus}>{status[step.id]}</Text>
          </View>
          <Text style={styles.stepNote}>{step.note}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

function ToolingScreen() {
  const [logs, setLogs] = useState([]);

  const runTools = () => {
    const now = new Date().toLocaleTimeString();
    setLogs((prev) => [
      { id: `${now}-1`, text: `[${now}] Router matched: JS runtime` },
      { id: `${now}-2`, text: `[${now}] Executed tool: WebView eval` },
      { id: `${now}-3`, text: `[${now}] Stored output to DataVault` },
      ...prev,
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Tool Orchestration</Text>
        <Text style={styles.cardCopy}>
          Trigger a mock tool run to generate execution logs.
        </Text>
        <Pressable style={styles.actionButton} onPress={runTools}>
          <Text style={styles.actionButtonText}>Run Toolchain</Text>
        </Pressable>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Execution Logs</Text>
        {logs.length === 0 ? (
          <Text style={styles.cardCopy}>No runs yet. Tap “Run Toolchain”.</Text>
        ) : (
          logs.map((log) => (
            <Text key={log.id} style={styles.logLine}>
              {log.text}
            </Text>
          ))
        )}
      </View>
    </ScrollView>
  );
}

function ValidationScreen() {
  const [status, setStatus] = useState('Passed');
  const [lastRun, setLastRun] = useState('—');

  const runValidation = () => {
    const next = status === 'Passed' ? 'Failed' : 'Passed';
    setStatus(next);
    setLastRun(new Date().toLocaleTimeString());
  };

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Dual LLM Validation</Text>
        <Text style={styles.cardCopy}>
          Simulate a verification loop. Each run flips pass/fail.
        </Text>
        <Pressable style={styles.actionButton} onPress={runValidation}>
          <Text style={styles.actionButtonText}>Run Validation</Text>
        </Pressable>
      </View>
      <View style={styles.validationCard}>
        <Text style={styles.validationLabel}>Current Status</Text>
        <Text style={styles.validationValue}>{status}</Text>
        <Text style={styles.validationNote}>Last run: {lastRun}</Text>
      </View>
    </ScrollView>
  );
}

function DataVaultScreen() {
  const [snapshots, setSnapshots] = useState(12);
  const [memory, setMemory] = useState(1.8);
  const [lastSync, setLastSync] = useState('2 min ago');

  const addSnapshot = () => {
    setSnapshots((prev) => prev + 1);
    setMemory((prev) => Number((prev + 0.2).toFixed(1)));
    setLastSync('Just now');
  };

  const purge = () => {
    setSnapshots(0);
    setMemory(0.0);
    setLastSync('Just now');
  };

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>DataVault Storage</Text>
        <Text style={styles.cardCopy}>
          External storage offloads intermediate context to keep the main model lean.
        </Text>
      </View>
      <View style={styles.grid}>
        <Metric label="Snapshots" value={String(snapshots)} note="Stored tasks" />
        <Metric label="Memory" value={`${memory} GB`} note="Context offload" />
        <Metric label="Last Sync" value={lastSync} note="DataVault" />
        <Metric label="Retention" value="30 days" note="Policy" />
      </View>
      <View style={styles.actionRow}>
        <Pressable style={styles.actionButton} onPress={addSnapshot}>
          <Text style={styles.actionButtonText}>Store Snapshot</Text>
        </Pressable>
        <Pressable style={styles.actionGhost} onPress={purge}>
          <Text style={styles.actionGhostText}>Purge</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 12,
    backgroundColor: '#0b0d1f',
  },
  headerEyebrow: {
    color: '#7dd3fc',
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontSize: 12,
    fontWeight: '600',
  },
  headerTitle: {
    color: '#f8fafc',
    fontSize: 28,
    fontWeight: '700',
    marginTop: 6,
  },
  headerSubtitle: {
    color: '#cbd5f5',
    marginTop: 6,
    fontSize: 14,
    lineHeight: 20,
  },
  content: {
    flex: 1,
  },
  nav: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 8,
    backgroundColor: '#0b0d1f',
  },
  navButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.2)',
    alignItems: 'center',
  },
  navButtonActive: {
    backgroundColor: '#38bdf8',
    borderColor: 'transparent',
  },
  navText: {
    color: '#cbd5f5',
    fontSize: 12,
    fontWeight: '600',
  },
  navTextActive: {
    color: '#0b0d1f',
  },
  screen: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
    gap: 14,
  },
  card: {
    backgroundColor: '#111827',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.2)',
  },
  cardTitle: {
    color: '#f8fafc',
    fontSize: 18,
    fontWeight: '700',
  },
  cardCopy: {
    color: '#cbd5f5',
    marginTop: 8,
    lineHeight: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricCard: {
    flexBasis: '48%',
    backgroundColor: '#0b1220',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.12)',
  },
  metricLabel: {
    color: '#94a3b8',
    fontSize: 12,
  },
  metricValue: {
    color: '#f8fafc',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 6,
  },
  metricNote: {
    color: '#64748b',
    fontSize: 11,
    marginTop: 4,
  },
  stepCard: {
    backgroundColor: '#0b1220',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.12)',
  },
  stepHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepTitle: {
    color: '#e2e8f0',
    fontWeight: '600',
  },
  stepStatus: {
    color: '#38bdf8',
    fontWeight: '700',
  },
  stepNote: {
    color: '#94a3b8',
    marginTop: 8,
    fontSize: 12,
  },
  actionButton: {
    marginTop: 12,
    backgroundColor: '#38bdf8',
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#0b0d1f',
    fontWeight: '700',
  },
  actionGhost: {
    marginTop: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.2)',
    paddingVertical: 10,
    alignItems: 'center',
  },
  actionGhostText: {
    color: '#cbd5f5',
    fontWeight: '600',
  },
  logLine: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 6,
  },
  validationCard: {
    backgroundColor: '#0b1220',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.12)',
  },
  validationLabel: {
    color: '#94a3b8',
    fontSize: 12,
  },
  validationValue: {
    color: '#f8fafc',
    fontSize: 22,
    fontWeight: '700',
    marginTop: 6,
  },
  validationNote: {
    color: '#64748b',
    fontSize: 11,
    marginTop: 4,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
  },
});
