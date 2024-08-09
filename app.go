package main

import (
	"context"
	"encoding/json"
	"os"
	"path/filepath"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// App struct
type App struct {
	ctx context.Context
	fileName string
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	userDir, _:=os.UserHomeDir()
	appDir:=filepath.Join(userDir, "todos_app")
	_=os.Mkdir(appDir, os.ModePerm)
	a.fileName = filepath.Join(appDir, "todos.json")

	runtime.EventsOn(ctx, "saveAll", func(data ...interface{}) {
		if data != nil && data[0] != nil {
			todos := []byte(data[0].(string))
			os.WriteFile(a.fileName, todos, 0644)
		}
	})
}

// Greet returns a greeting for the given name
func (a *App) GetAllTodos() []string {
	var todos []string
	content, err := os.ReadFile(a.fileName)
	if err != nil {
		return nil
	}
	err = json.Unmarshal(content, &todos)
	if err != nil {
		return nil
	}
	return todos
}
