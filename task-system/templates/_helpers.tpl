{{- define "task-system.name" -}}
{{- if .Values.nameOverride }}{{ .Values.nameOverride }}{{ else }}{{ .Chart.Name }}{{ end -}}
{{- end -}}

{{- define "task-system.fullname" -}}
{{- if .Values.fullnameOverride }}{{ .Values.fullnameOverride }}{{ else }}{{ printf "%s-%s" .Release.Name (include "task-system.name" .) }}{{ end -}}
{{- end -}}

{{- define "task-system.labels" -}}
helm.sh/chart: {{ printf "%s-%s" .Chart.Name .Chart.Version }}
app.kubernetes.io/name: {{ include "task-system.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/version: {{ .Chart.AppVersion }}
{{- end -}}
